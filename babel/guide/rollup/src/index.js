class App {
  constructor() {
    console.log("App");
  }

  async render() {
    console.log("render");
    await import("./helper");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }
}

export const app = new App();