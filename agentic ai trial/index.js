const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { getGeminiResponse } = require("./services/geminiService");
const { textToSpeech } = require("./services/ttsService");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve audio files
app.use(express.static(path.join(__dirname, ".")));

// API endpoint
app.post("/ask", async (req, res) => {
  try {
    const { input } = req.body;

    const reply = await getGeminiResponse(input);
    const audioFile = await textToSpeech(reply); // e.g., output_1718271800.mp3

    res.json({
      reply,
      audioFile: path.basename(audioFile), // just the file name
    });
  } catch (err) {
    console.error("❌ Error in /ask:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Agent backend running on http://localhost:${PORT}`);
});
