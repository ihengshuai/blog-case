const ws = new WebSocket("ws://localhost:10000/socket");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const chat = document.querySelector("ul");

const url = new URLSearchParams(location.search);

const id = url.get("name") || "游客" + +new Date();
const reader = new FileReader();

ws.addEventListener("error", (err) => {
  console.log(err);
});

ws.addEventListener("open", () => {
  sendMessage(id + "上线了");
});

ws.addEventListener("message", (ev) => {
  if (ev.data instanceof Blob) {
    reader.readAsText(ev.data);
    reader.onload = () => {
      const { id: resId, msg } = JSON.parse(reader.result) || {};
      if (resId !== id) {
        const li = document.createElement("li");
        li.innerHTML = `-「${resId}」说：${msg}`;
        chat.appendChild(li);
      }
    };
  } else {
    console.log(ev.data);
  }
});

btn.addEventListener("click", () => {
  sendMessage(input.value);
  const li = document.createElement("li");
  li.className = "me";
  li.innerHTML = `「我」说：${input.value} -`;
  chat.appendChild(li);
  input.value = "";
});

function sendMessage(msg) {
  ws.send(
    JSON.stringify({
      id,
      msg,
    })
  );
}
