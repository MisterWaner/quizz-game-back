import express, { Request, Response } from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
import algebraRouter from "./routers/quizz-router";

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});
app.use("/algebra", algebraRouter);

app.listen(port, () => {
    console.log(`Server démarré sur le port ${port}`);
})