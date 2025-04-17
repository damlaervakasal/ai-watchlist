const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getMoviePromptResponse(prompt) {
  // .env'deki USE_FAKE_AI true ise sahte cevap dönüyor
  if (process.env.USE_FAKE_AI === "true") {
    console.log("Test modunda çalışıyor. OpenAI API çağrılmadı.");
    return `Test cevabı: "${prompt}" için önerilen filmler: Inception, Matrix, Interstellar.`;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error OpenAI:", error);
    return "Error fetching AI response";
  }
}

module.exports = { getMoviePromptResponse };
