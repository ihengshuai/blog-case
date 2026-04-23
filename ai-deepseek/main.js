import OpenAI from "openai";
import { CHAT_CONFIG } from "./config.js";

const openai = new OpenAI({
  ...CHAT_CONFIG,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "中国有多少个省份" }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();
