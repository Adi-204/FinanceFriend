import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import fs from 'fs';

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

const runImg = async (path)=> {
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY,safetySettings);
  async function run(path){
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = "I uploaded a photo of my bill.Please analyze the bill to identify key charges  and suggest specific ways to reduce the cost (atleast 8 suggestions) and include any more important insight for me you can extract from bill.Provide a detailed analysis to help me understand my bill better.You are professional bill analyzer.Provide a conclusion at end. (Note - If users has not uploaded a photo in which no amount and items are written tell them to upload bill)";

      const image = {
          inlineData: {
              data: Buffer.from(fs.readFileSync(path)).toString("base64"),
              mimeType: "image/png" || "image/webp" || "image/jpeg" || "image/heic" || "image/heif",
          },
      };
      const result = await model.generateContent([prompt,image]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      return text;
  }
  return run(path);
}  


export {runBot, runImg};

