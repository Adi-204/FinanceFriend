import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import chatbotRoute from "./routes/chatbot.routes.js";
import cors from 'cors';
import advisorRoute from "./routes/advisor.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRoute);
app.use("/api/chatbot",chatbotRoute);
app.use("/api/advisor",advisorRoute);

export { app }

