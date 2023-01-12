// This code is for v4 of the openai package: npmjs.com/package/openai

import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: __dirname + "/.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (!openai.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API Key not configured",
      },
    });
    return;
  }

  const animal = req.body.animal || "";

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: `suggest three pet names for the follow ${animal}`,
    temperature: 0.8,
    max_tokens: 256,
  });

  res.status(200).json({ result: response.data.choices[0].text });
}
