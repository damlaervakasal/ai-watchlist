const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const suggestMovies = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = response.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({ error: "Film önerisi alınamadı." });
  }
};

module.exports = { suggestMovies };
