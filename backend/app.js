import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import chatbotRoute from "./routes/chatbot.routes.js";
import advisorRoute from "./routes/advisor.routes.js";
import riskRoute from "./routes/risk.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";
import billRoute from "./routes/bill.routes.js";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRoute);
app.use("/api/chatbot",chatbotRoute);
app.use("/api/advisor",advisorRoute);
app.use("/api/risk",riskRoute);
app.use("/api/dashboard",dashboardRoute);
app.use("/api/bill",billRoute);

export { app }

