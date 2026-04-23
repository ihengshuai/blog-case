// // @ts-check

/**
 * @param {string} msg 日志内容
 * @param {number} age 年龄
 */
function logger(msg, age = 1) {
  console.log(process.cwd(), process.env);
  console.log(msg);
}

// console.log(process.argv)
// logger("hello world");

let count = 0;
function getCount() {
  return count;
}

function setCount(value) {
  count = value;
}

module.exports = {
  count,
  getCount,
  setCount,
};
