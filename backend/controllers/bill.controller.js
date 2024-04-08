import asyncHandler from "express-async-handler";
import { runImg } from "../utils/geminiCall.js";


const billAnalysis = asyncHandler(async(req,res)=>{
    const { file } = req;
    const response = await runImg(file.path);
    const cleanText = response.replace(/\*/g, '');
    const cleanText2 = cleanText.replace(/\#/g, '');
    const sections = cleanText2.split(/\n/).filter(section => section.trim() !== '');
    res.status(200).send(sections);
})

export { billAnalysis };

