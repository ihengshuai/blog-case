setTimeout(() => {
  Promise.resolve().then(() => console.log("promise"));
  process.nextTick(() => console.log("nextTick"));
});
setImmediate(()=> console.log('setImmediate'));