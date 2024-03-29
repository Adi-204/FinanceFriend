import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";

const getNote = asyncHandler(async(req,res)=>{
    const getuser = await db.query('select * from users order by id');
    if(getuser.rowCount>0){
        return res.status(200).send(getuser.rows);
    }
    else{
        return res.status(403).send({ error: error, status: 403 });
    }
})

export { getNote }



