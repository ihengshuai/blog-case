process.on("message", (data) => {
  console.log("from parent: ", data);

  process.send("hello parent");
  process.exit(0);
});
