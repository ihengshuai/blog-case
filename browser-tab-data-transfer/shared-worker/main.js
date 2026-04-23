const btn = document.querySelector("#btn");
const worker = new SharedWorker("./shared-worker.js");

btn.addEventListener("click", (e) => {
  worker.port.postMessage(`Message from ${e.target.textContent}!`);
});
worker.port.start();
worker.port.onmessage = (e) => {
  console.log("Received:", e.data);
};

