// 步骤：render => initData => observe => defineReactive => dep => watcher => update => render

function render(renderFn: Function) {
  const watcher = renderFn.watcher || new Watcher(renderFn);
  if (!renderFn.watcher) {
    renderFn.watcher = watcher;
  }
  Dep.target = watcher;

  renderFn();
  Dep.target = null;
}

class Watcher {
  deps: Set<Dep>;
  cb: Function;

  constructor(cb: Function) {
    this.deps = new Set();
    this.cb = cb;
  }

  addDep(dep: Dep) {
    this.deps.add(dep)
    dep.addSub(this);
  }

  update () {
    this.cb?.();
  }
}

class Dep {
  static target: Watcher | null;
  subs: Array<Watcher>;

  constructor() {
    this.subs = [];
  }

  addSub(sub: Watcher) {
    if (this.subs.includes(sub)) return;
    this.subs.push(sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].update();
    }
  }
}
Dep.target = null

function observe(value: any) {
  if (typeof value !== "object") return;
  return new Observer(value) || value.__ob__;
}

class Observer {
  dep: Dep;
  constructor(value: any) {
    this.dep = new Dep();
    const self = this;
    Object.defineProperty(value, "__ob__", {
      configurable: false,
      get() {
        return self;
      },
    });

    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }

  walk(value: any) {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      Object.keys(value).forEach((k) => {
        defineReactive(value, k);
      });
    }
  }
}

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method as any];
  Object.defineProperty(arrayMethods, method, {
    value(...args: any) {
      const result = original.apply(this, args)
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted) ob.observeArray(inserted)
      ob.dep.notify()
      return result
    }
  })
})

const user = {
  name: "小明",
  age: 10,
  friends: ["小红", "小李"],
  // friends: {
  //   total: 10,
  // }
};

window.user = user;

// let page1 = () => console.log(`页面1： =====> 我的名字：${user.name}，年龄：${user.age}`);
// let page2 = () => console.log(`页面2 =====> 年龄：${user.age}，我有${user.friends.total}朋友`);
// let page3 = () => console.log(`页面3 =====> 我的名字：${user.name}，我有${user.friends.total}朋友`);

function defineReactive(obj: Record<string, any>, k: string) {
  let val: any = null;
  const getter = Object.getOwnPropertyDescriptor(obj, k)?.get;
  const setter = Object.getOwnPropertyDescriptor(obj, k)?.set;
  if (!getter) {
    val = obj[k];
  }
  const dep = new Dep();
  const childOb = observe(val);
  Object.defineProperty(obj, k, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return getter ? getter.call(obj) : val;
    },
    set(newVal) {
      if (!setter) {
        val = newVal;
      } else {
        setter.call(obj, newVal);
      }
      dep.notify();
    },
  });
}
observe(user)
// 假设当前页面正在渲染
// render(page1)
// user.name = "小李";
// render(page2)
// user.name = "校长";
// render(page3)

// 数组
const intro = () => console.log(`我的名字：${user.name}，我的朋友：${user.friends?.join("、")}`)
render(intro)


// Object.keys(user).forEach(k => defineReactives(user, k))

// const p1 = () => console.log(`【people1】名字：${user.name}`);
// const p2 = () => console.log(`【people2】名字：${user.name}，年龄：${user.age}`);
// const cbs: Map<string, Set<Function>> = new Map();

// let activeFn: Function | null = null;
// activeFn = p1;
// p1();
// user.name = '小王';
// activeFn = p2;
// p2();

// function defineReactives(obj: Record<string, any>, key: any) {
//   let value = obj[key]
//   Object.defineProperty(obj, key, {
//     configurable: true,
//     enumerable: true,
//     get() {
//       if (!cbs.has(key)) {
//         cbs.set(key, new Set());
//       }
//       const deps = cbs.get(key)
//       deps?.add(activeFn!);
//       console.log('get log: 访问属性 ', key, '当前activeFn为 ', activeFn?.name)
//       return value;
//     },
//     set(newValue) {
//       value = newValue;
//       console.log('set log: 设置属性 ', key, '当前activeFn为 ', activeFn?.name)
//       const deps = cbs.get(key)
//       deps?.forEach(dep => dep())
//     }
//   })
// }
