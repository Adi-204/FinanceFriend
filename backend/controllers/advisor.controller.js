import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";
import { runBot } from "../utils/runBot.js";

const getAdvice = asyncHandler(async(req,res)=>{
    const userData = req.body;

    let goals = "";

    userData.forEach(element => {
        goals += element + ',';
    });

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country,age,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];

    let prompt = `I am ${user.firstname} ${age} years old, living in ${country}.I am currently 
    ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}. My financial goals are ${goals}.You are a professional Financial Advisor.Give breif intro of me first. Analyze each financial goal with how to acheive them in detail by giving step be step roadmap for each goal with financial statistics as a proof , timeframes (give approx number) and conclusion.Include additional financial tips relevant to your situation.`;

    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);
    
});

export {getAdvice};
