import Vue from "vue";
import { useMouse } from "@/hooks/use-mouse.hook";

class State {
  constructor() {
    this.count = 0;
  }
}

function setup(vm) {
  // 其实直接使用this就是组件实例，这里vm外面也不需要传，框架内部在初始化时会自动传入

  const state = Vue.observable(new State());
  const { state: mouseState, ...rest } = useMouse(vm, "#box");

  function inc() {
    state.count++;
  }

  const proxy = [...Object.values(rest), inc];
  proxy.forEach((l) => (vm[l.name] = l));

  vm.state = state;
  vm.mouseState = mouseState;

  return {};
}

export default {
  name: "test-setup-hooks",
  data: setup,
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.inc}>增加</button>

        <hr />

        <div
          id="box"
          style="width: 400px;height:400px;background:salmon;text-align:center;line-height:400px;font-size:16px;font-weight:bold;"
        >
          {this.mouseState.mouseX},{this.mouseState.mouseY}
        </div>
      </div>
    );
  },
};
