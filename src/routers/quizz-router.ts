import { Router } from "express";
import { getAdditions, getMathQuestions, getMultiplications, getSubstractions } from "../controllers/quizz-controller";

const algebraRouter = Router();

algebraRouter.get("/additions", getAdditions);
algebraRouter.get("/substractions", getSubstractions);
algebraRouter.get("/multiplications", getMultiplications);
algebraRouter.get("/math-questions", getMathQuestions);

export default algebraRouter;