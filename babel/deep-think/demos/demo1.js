import { parse } from "@babel/parser";
import { transformFromAstSync, traverse } from "@babel/core";
import fs from "fs";
import path from "path";
import { cwd } from "process";
import { generate } from "@babel/generator";


const content = fs.readFileSync(path.resolve(cwd(), "./demos/source.ts"), {
  encoding: "utf-8",
});

const ast = parse(content, {
  plugins: ["typescript"],
});

const g = generate(ast);

const { code } = transformFromAstSync(ast);

console.log(g, code, ast.program.body[0]);
