import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const runBot = async(prompt) =>{
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];
    
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY,safetySettings);
  
  async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  return run(prompt);
}

export {runBot};
