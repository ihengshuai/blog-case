window.addEventListener("storage", (e) => {
  console.log(`
key: ${e.key}
oldValue: ${e.oldValue}
newValue: ${e.newValue}    
  `);

  console.log(e);
});
