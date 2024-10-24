// OpenAI.js
import axios from "axios";

const API_KEY = "sk-proj-nNBMPBhH7V4Lo5tj3rSHT3BlbkFJmTE3JXqipk7bJ1Wll5KB";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const chatGPTRequest = async (input) => {
  try {
    const response = await openai.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Hello, What topic you want to talk" },
        { role: "user", content: input },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    console.log("API Response:", response.data);
    if (response.data.choices && response.data.choices.length > 0) {
      const text = response.data.choices[0].message.content;
      return text.trim();
    } else {
      throw new Error("Empty or invalid response from the API");
    }
  } catch (error) {
    console.error("ChatGPT Request Error:", error);
    return "Sorry, an error occurred.";
  }
};
