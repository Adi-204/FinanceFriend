import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";
import { runBot } from "../utils/runBot.js";

const analyzeFinance = asyncHandler(async(req,res)=>{

    const {risk, risk_rate, risk_amount, invest_time} = req.body;

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country, age,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];

    let prompt;

    
    prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}.I am taking a ${invest_time} financial risk ${risk} with investment of ${risk_amount}.I am ${risk_rate} in taking risks.I am seeking guidance regarding the potential financial impact of risk - ${risk}. Create a sample "Financial Impact Bill" outlining the potential costs associated with the risk - ${risk} with breakdown of potential costs included in bill.I want to make a well-informed decision about risk i.e ${risk} that considers both the financial benefits and potential risks.`;

    
    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);
    
});

const analyzeHealth = asyncHandler(async(req,res)=>{

    const {invest_losses,risk, risk_rate, risk_amount, invest_time, loss_react} = req.body;

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country, age,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];

    let prompt;

    if(invest_losses === "Yes"){
        prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}.I am taking a ${invest_time} financial risk ${risk} with investment of ${risk_amount}.I am ${risk_rate} in taking risks.When I face investment losses in past my emotions are ${loss_react}.What are the potential physical and mental health risks associated with taking a financial risk like this ${risk}? What specific preventive measures can I take to mitigate these health risks while pursuing this purchase? I want to make an informed decision about this purchase that considers not just the financial implications, but also my overall well-being.`;
    }
    
    else{
        prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}.I am taking a ${invest_time} financial risk ${risk} with investment of ${risk_amount}.I am ${risk_rate} in taking risks. You are a Financial Risk Analyst. What are the potential physical and mental health risks associated with taking a financial risk like this ${risk}? What specific preventive measures can I take to mitigate these health risks while pursuing this purchase? I want to make an informed decision about this purchase that considers not just the financial implications, but also my overall well-being.`;
    }
    
    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);
    
});

const analyzeLegal = asyncHandler(async(req,res)=>{
    const {risk, risk_rate, risk_amount, invest_time} = req.body;

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country, age,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];


    const prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}.I am taking a ${invest_time} financial risk ${risk} with investment of ${risk_amount}.I am ${risk_rate} in taking risks.I am seeking guidance from a Financial Risk Analyst regarding the potential compliance and legal risks associated with ${risk} for approximately ${risk_amount}.I prioritize minimizing legal and regulatory issues.Highlight the key legal and regulatory risks associated with ${risk}.Focus on important laws of ${country} that could impact ${risk}.Explain the potential consequences of non-compliance with these laws (e.g., delays, financial penalties, legal disputes).I want to ensure a smooth and legally sound ${risk} process.`;

    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);

})

const analyzeFuture = asyncHandler(async(req,res)=>{
    const {risk, risk_rate, risk_amount, invest_time} = req.body;

    const user = req.user;

    const getFinancialDetails = await db.query('select * from users_financial_details where user_id=$1',[user.id]);

    const { country, age,emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref } = getFinancialDetails.rows[0];


    const prompt = `I am ${user.firstname} ${age} years old living in ${country} and ${emply_status}.My monthly income is $ ${monthly_inc}, monthly expenses ${monthly_exp} and I am able to save $ ${monthly_sav} per month.My investment preferences are ${investment_pref}.I have debt of $ ${debt}.I am taking a ${invest_time} financial risk ${risk} with investment of ${risk_amount}.I am ${risk_rate} in taking risks.I am seeking guidance from a Financial Risk Analyst regarding the potential long-term impact of risk - ${risk}.I want to understand how this decision might affect my future plans.Analyze how this purchase might influence my future in the areas - Personality and Lifestyle. Provide a sample financial projection to visualize potential costs over time.`;


    const response = await runBot(prompt);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);

})


export {analyzeFinance , analyzeHealth, analyzeLegal, analyzeFuture};

