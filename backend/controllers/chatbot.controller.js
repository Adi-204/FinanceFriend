import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const runBot = async(prompt) =>{
    const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 100,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ];
      
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY,generationConfig,safetySettings);
    
    async function run(prompt) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }
    return run(prompt);
}


const sendQuery = asyncHandler(async(req,res)=>{

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    console.log(getFinancialDetails);

    const { emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];

    let prompt;

    if(investment_pref.length === 0){
        prompt = `I am ${user.firstname}.I am ${emply_status} currently.My monthly income is $ ${monthly_inc},my monthly expense is $ ${monthly_exp} and I am able to save $ ${monthly_sav} per month.I have debt of $ ${debt}.I want to buy a car give me step by step guidance like a personal Financial Advisor. Start conversation by greeting me`;
    }

    else{
        prompt = `I am ${user.firstname}.I am ${emply_status} currently.My monthly income is ${monthly_inc},my monthly expense is ${monthly_exp} and I am able to save ${monthly_sav} per month.I have debt of $ ${debt}.I like investing in ${investment_pref} etc.I want to buy a car give me step by step guidance like a personal Financial Advisor.Start conversation by greeting me `;
    }

    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    console.log(cleanText);
    const steps = cleanText.split('\n\n').map((step, index) => {
        const stepNumber = step.match(/Step (\d+):/);
        return {
            step: stepNumber ? stepNumber[1] : null,
            content: step.replace(/Step \d+:/, '').trim()
        };
    });
    console.log(steps);
    const resp = JSON.stringify(steps);
    res.status(200).send(resp);
})

export {sendQuery};
