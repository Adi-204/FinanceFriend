import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";
import { runBot } from "../utils/geminiCall.js";


const customChat = asyncHandler(async(req,res)=>{
    const userData = req.body;

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref,age } = getFinancialDetails.rows[0];
  
    let prompt = `I am ${user.firstname} ${age} years old, living in ${country}.I am currently 
    ${emply_status} .My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have a debt of ${debt}.Here's my question: ${userData.chat}.In output give brief intro of me and then explain my question answer in detail`;

    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);

});

const autoAnalysis = asyncHandler(async(req,res)=>{
    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { profession,country,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref,age } = getFinancialDetails.rows[0];
  
    const prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My profession is ${profession}. My monthly income is $ ${monthly_inc}, I am able to save $ ${monthly_sav} per month and my expenses are ${monthly_exp} per month. I have debt of $ ${debt}. My investment preferences are ${investment_pref}. I'd like to get a financial analysis of my current situation.I'm interested in understanding: Savings Rate, Debt-to-Income Ratio and Income Stability, Areas for improvement (e.g., saving more, reducing expenses), Income-Generating Strategies : Exploring options to potentially increase my income, considering my profession and skills (if relevant). My goal is to gain actionable insights and recommendations to improve my financial well-being and achieve my financial goals.`;

    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);
})


export {customChat, autoAnalysis};

