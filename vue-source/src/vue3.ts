// 当前正在运行的函数
let activeEffect: null | Function;
// 副作用函数用来修改 activeEffect 的值
function effect(fn: Function) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// 依赖收集集合
const targetMap = new WeakMap<any, Map<string, Set<Function>>>();
// 收集依赖
function track(target: any, key: string) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep?.add(activeEffect);
  }
}

// 派发更新
function trigger(target: any, key: string) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  if (Array.isArray(target) && Number(key)) {
    return depsMap.get("length")?.forEach((dep) => dep?.());
  }
  const deps = depsMap.get(key);
  deps?.forEach((dep) => dep?.());
}

// 拦截对象的get/set等等
function reactive(target: Record<string, any>): any {
  return new Proxy(target, {
    get(target, key: string, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 收集依赖
      track(target, key);
      if (typeof result === "object") {
        return reactive(result);
      }
      return result;
    },
    set(target, key: string, newValue, receiver) {
      const oldValue = target[key];
      // 值一样直接返回
      if (oldValue === newValue) return true;
      const result = Reflect.set(target, key, newValue, receiver);
      // 出发当前key依赖更新
      trigger(target, key);
      return result;
    },
  });
}

const user = reactive({
  name: "小明",
  age: 10,
  friends: ["鲁班", "钟馗"],
});
// effect(() => console.log(`p1：我的名字：${user.name}，年龄：${user.age}`));
// effect(() => console.log(`p2：年龄：${user.age}，爱好：${user.info.hobby}`));
// effect(() => console.log(`p3：我的名字：${user.name}，年龄：${user.age}，爱好：${user.info.hobby}，女朋友：${user.info.girlFriend.name}`));
// effect(() =>
//   console.log(`p4：我的名字：${user.name}，朋友：${user.friends?.join("、")}`)
// );

function ref(value: string | boolean | number) {
  return reactive({ value });
}
const loading = ref(false);
window.loading = loading;
// effect(() => loading.value && console.log("加载中。。。"))

class ObjectRef {
  constructor(
    private readonly _object: any,
    private readonly _key: any,
  ) {}

  get value() {
    const val = this._object[this._key]
    return val;
  }

  set value(newVal) {
    this._object[this._key] = newVal
  }
}
function toRefs(obj: any) {
  const res = {};
  Object.keys(obj).forEach(k => {
    res[k] = new ObjectRef(obj, k)
  })
  return res;
}
const { age } = toRefs(user);

effect(() => console.log(`p1：我的名字：${user.name}，年龄：${user.age}`));
effect(() => console.log(`p2：年龄：${age.value}`));


window.toRefs = toRefs;
window.age = age;
window.user = user;
window.targetMap = targetMap;
