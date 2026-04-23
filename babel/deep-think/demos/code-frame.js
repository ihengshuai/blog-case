import { codeFrameColumns, highlight } from "@babel/code-frame";

const sourceCode = `class Foo {
  constructor() {
    this.bar = 42;
  }
}`;

// console.log(highlight(sourceCode));

const location = {
  start: { line: 2, column: 16 },
  end: { line: 3, column: 10 },
};

const result = codeFrameColumns(sourceCode, location, {
  highlightCode: true,
  message: "语法错误",
});

console.log(result);
