const axios = require("axios");
const fs = require("fs");
const { ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID } = require("../config");

async function textToSpeech(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

  const response = await axios.post(
    url,
    {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    },
    {
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    }
  );

  const outputPath = `./output_${Date.now()}.mp3`;
  fs.writeFileSync(outputPath, response.data);
  return outputPath;
}

module.exports = { textToSpeech };
