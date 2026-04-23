import readline from "readline";
import axios from "axios";

const API_URL = "http://localhost:11434/api/chat";
const MODEL = "deepseek-r1:14b";

async function generateMessage(inputText) {
  const completion = axios({
    url: API_URL,
    method: "POST",
    data: {
      model: MODEL,
      messages: [{ role: "user", content: inputText }],
      stream: true,
    },
    responseType: "stream",
  });

  completion.then((res) => {
    res.data.on("data", (chunk) => {
      process.stdout.write(JSON.parse(chunk.toString()).message.content || "");
    });

    res.data.on("end", () =>
      console.log("\n\n(以上是我的回答，请合理参考，祝您生活愉快！)\n\n")
    );
  });
}

function bootstrap() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "我是一个智能助手，你可以向我提问任何问题，我将尽力回答。🌈🌈\n\n"
  );

  rl.on("line", async (input) => {
    if (input === "q") {
      rl.close();
      return;
    }

    generateMessage(input);
  });

  rl.on("close", () => {
    console.log("\nBye!");
    process.exit(0);
  });
}

try {
  bootstrap();
} catch (error) {
  console.error(error);
  process.exit(1);
}
