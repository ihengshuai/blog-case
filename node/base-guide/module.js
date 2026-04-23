const otherModule = require("./index");
console.log(otherModule)

otherModule.setCount(10);

console.log(otherModule.count);

console.log(otherModule.getCount());
