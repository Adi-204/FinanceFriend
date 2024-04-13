import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";

const getPersonalDetails = asyncHandler(async(req,res)=>{
    const { id, firstname, lastname, email } = req.user;

    const getUser = await db.query('select age,country,profession from users_financial_details where user_id=$1',[id]);

    let userAge,userCountry,userProfession;

    if(getUser.rowCount == 0){
        userAge="";
        userCountry="";
        userProfession="";
    }
    
    const {age,country,profession} = getUser.rows[0];

    userAge = age;
    userCountry = country;
    userProfession = profession;

    const userData = {
        firstname,
        lastname,
        email,
        userAge,
        userCountry,
        userProfession
    }

    res.status(200).send(userData);

})

const updatePersonalDetails = asyncHandler(async(req,res)=>{

    const { firstname, lastname, email, age, country, profession }  = req.body;

    const { id } = req.user;

    const updatePersonal = await db.query('UPDATE users_account SET firstname=$1, lastname=$2, email=$3  where id=$4',[firstname,lastname,email,id]);

    const updateFinance = await db.query('UPDATE users_financial_details SET age=$1, country=$2, profession=$3 where user_id=$4',[age, country, profession,id]);

    const userData = {
        firstname,
        lastname,
        email,
        userAge : age,
        userCountry  : country,
        userProfession : profession
    }

    
    if (updatePersonal.rowCount > 0 && updateFinance.rowCount > 0) {
        res.status(200).send(userData);
    } else {
        res.status(400).send('Failed to update personal and financial details' );
    }

})

const getFinanceDetails = asyncHandler(async(req,res)=>{

    const { id } = req.user;

    const getFinance = await db.query('select emply_status,monthly_inc,monthly_exp,monthly_sav,debt,investment_pref from users_financial_details where user_id=$1',[id]);

    const invest_arr = getFinance.rows[0].investment_pref.split(',');

    const userData = getFinance.rows[0];

    userData.investment_pref = invest_arr;

    res.status(200).send(userData);
})

const updateFinanceDetails = asyncHandler(async(req,res)=>{
    const formData = req.body;
    const user_id = req.user.id;
    const {emply_status, monthly_inc, monthly_exp, monthly_sav, debt} = req.body;

    let investment_pref = "";
    if(formData.stocks){
        investment_pref+="stocks,";
    }
    if(formData.real_estate){
      investment_pref+="real_estate,";
    }
    if(formData.crypto){
      investment_pref+="crypto,";
    }
    if(formData.mutual_funds){
      investment_pref+="mutual_funds,";
    }

    const debt_am = Number(debt);

    try {
        const updateData = await db.query("UPDATE users_financial_details SET emply_status=$1, monthly_inc=$2, monthly_exp=$3, monthly_sav=$4, debt=$5, investment_pref=$6 where user_id=$7", [emply_status, monthly_inc, monthly_exp, monthly_sav, debt_am, investment_pref,user_id]);

        const invest_arr = investment_pref.split(',');

        const userData = {
            emply_status, 
            monthly_inc, 
            monthly_exp, 
            monthly_sav, 
            debt,
            investment_pref : invest_arr
        }
        
        if (updateData.rowCount > 0) {
            return res.status(200).send(userData);
        } 

    } 
    catch (error) {
        return res.status(500).send("Error updating data");
    }

})

export {getPersonalDetails, updatePersonalDetails, getFinanceDetails, updateFinanceDetails};

