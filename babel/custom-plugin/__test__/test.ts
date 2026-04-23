import { pluginTester } from "babel-plugin-tester";
import { TransferArrowFunctionPlugin } from "../transfer-arrow-plugin/plugin";

pluginTester({
  plugin: TransferArrowFunctionPlugin,
  tests: [
    {
      title: "Test1",
      code: `
        const a = () => {
          console.log('hello')
        }
      `,
      snapshot: true,
    },
    {
      title: "Test2",
      code: `
        const a = () => {
          console.log('hello')
        }
      `,
      output: `
        const a = function () {
          if (new.target) throw Error("a is not a constructor");
          console.log("hello");
        };
      `,
    },
  ],
});
