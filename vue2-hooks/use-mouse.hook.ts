import Vue from "vue";

class State {
  mouseX: number;
  mouseY: number;
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
  }

  get total() {
    return this.mouseX + this.mouseY;
  }
}

export function useMouse(vm: Vue, selector: string) {
  const state = Vue.observable(new State());

  // vm.$watch(
  //   () => state.mouseX,
  //   () => {
  //     console.log("watch...");
  //   }
  // );

  vm.$on("hook:mounted", () => {
    const el: HTMLElement = document.querySelector(selector) as HTMLElement;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
  });

  vm.$on("hook:destroyed", () => {
    const el: HTMLElement = document.querySelector(selector) as HTMLElement;
    if (!el) return;
    el.removeEventListener("mousemove", handleMouseMove);
  });

  function handleMouseMove(e: MouseEvent) {
    state.mouseX = e.pageX;
    state.mouseY = e.pageY;
  }

  return {
    state,
  };
}
