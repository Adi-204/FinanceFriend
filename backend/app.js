import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import notesRoute from "./routes/notes.routes.js";

const app = express();


app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRoute);
app.use("/api/notes",notesRoute);

export { app }

