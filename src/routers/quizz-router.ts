import { Router } from "express";
import {getAdditions, getMathQuestions, getMultiplications, getSubstractions} from "../controllers/quizz-getters";

const algebraRouter = Router();

algebraRouter.get("/addition", getAdditions);
algebraRouter.get("/soustraction", getSubstractions);
algebraRouter.get("/multiplication", getMultiplications);
algebraRouter.get("/random", getMathQuestions);

export default algebraRouter;