import { useMouse } from "@/hooks/use-mouse.hook";

export default {
  name: "test-use-mouse",
  data() {
    this.mouse = useMouse(this, "#box");

    return {
      formName: "test-use-mouse",
    };
  },
  render() {
    return (
      <div
        id="box"
        style="width: 400px; height: 400px; background: salmon;text-align: center;line-height: 400px;font-size:16;"
      >
        {this.mouse.state.mouseX} + {this.mouse.state.mouseY} ={" "}
        {this.mouse.state.total}
      </div>
    );
  },
};
