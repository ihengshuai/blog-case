// import "@babel/polyfill"

const p = new Promise();
export const logger = () => console.log("logger");
async function run() {
  const helper = await import("./helper");
}