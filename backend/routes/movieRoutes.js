const express = require("express");
const router = express.Router();
const { getMoviePromptResponse } = require("../services/openaiService");
const { searchMovieByName } = require("../services/tmdbService");

router.post("/suggest", async (req, res) => {
  console.log(">> /suggest endpoint'e istek geldi.");

  const { prompt } = req.body;

  if (!prompt) {
    console.log("Hata: Prompt eksik!");
    return res.status(400).json({
      error: "Prompt is required",
      receivedBody: req.body,
    });
  }

  try {
    // ai'den gelen yanıt
    const aiResponse = await getMoviePromptResponse(prompt);
    const movieName = aiResponse.split("\n")[0];
    const movies = await searchMovieByName(movieName);

    res.json({
      suggestion: aiResponse,
      result: movies,
    });
  } catch (error) {
    console.error("Error fetching movie suggestion:", error);
    res.status(500).json({ error: "Failed to fetch movie suggestion" });
  }
});

module.exports = router;
