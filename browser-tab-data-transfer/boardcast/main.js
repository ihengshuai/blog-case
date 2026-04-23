const btn = document.querySelector("#btn")
const channel = new BroadcastChannel("tab-channel");

btn.addEventListener("click", (e) => {
  channel.postMessage({ action: "notify", data: `from: ${e.target.textContent}` });
});
channel.onmessage = (e) => {
  console.log(e.data);
};