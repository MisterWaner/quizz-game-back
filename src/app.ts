import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDb } from "./lib/data";
import "./lib/score-tasks";

import {algebraRouter, geometryRouter} from "./routers/quizz-router";
import userRouter from "./routers/user-router";
import authRouter from "./routers/auth-router";
import scoreRouter from "./routers/score-router";
import subjectRouter from "./routers/subject-router";

config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders:
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Routes */
app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});
app.use("/algebra", algebraRouter);
app.use("/geometry", geometryRouter);
app.use("/users", userRouter);
app.use("/scores", scoreRouter);
app.use("/auth", authRouter);
app.use("/subjects", subjectRouter);

app.listen(port, () => {
    console.log(`Server démarré sur le port ${port}`);
    initDb();
})