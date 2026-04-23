class App {
  constructor() {
    console.log("App");
  }

  render(target) {
    console.log(target);
  }
}

export const app = new App();
