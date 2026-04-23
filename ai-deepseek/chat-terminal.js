import readline from "readline";
import OpenAI from "openai";
import { CHAT_CONFIG } from "./config.js";

const openai = new OpenAI({
  ...CHAT_CONFIG,
});

async function generateMessage(inputText) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: inputText }],
    model: "deepseek-chat",
    stream: true,
  });

  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }

  console.log("\n\n以上是我的回答，请合理参考，祝您生活愉快！\n\n")
}

function bootstrap() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("我是一个智能助手，你可以向我提问任何问题，我将尽力回答。🌈🌈\n\n")

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
