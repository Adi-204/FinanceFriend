import jwt from "jsonwebtoken";
import 'dotenv/config';
import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";

const authMiddleware = asyncHandler(async(req,res,next) =>{
    let token;
    console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            const getUser = await db.query('select * from users where id=$1',[decoded.id]);
            req.user = getUser.rows[0];
            next();
        } 
        catch (error) {
            res.status(403).send({ error: error}); 
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
})


export {authMiddleware}
