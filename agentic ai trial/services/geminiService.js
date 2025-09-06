const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash-latest", //"models/gemini-1.5-pro-latest"
  });

  const stream = await model.generateContentStream(prompt);

  let fullResponse = "";

  for await (const chunk of stream.stream) {
    const part = chunk.text();
    fullResponse += part;
    process.stdout.write(part); // optional: live output to terminal
  }

  return fullResponse;
}

module.exports = { getGeminiResponse };
