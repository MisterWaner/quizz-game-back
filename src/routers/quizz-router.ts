import { Router } from "express";
import {
    getAdditions,
    getAreaAndPerimeterQuestions,
    getMathQuestions,
    getMultiplications,
    getSubstractions,
} from "../controllers/quizz-getters";

const algebraRouter = Router();
const geometryRouter = Router();

algebraRouter.get("/addition", getAdditions);
algebraRouter.get("/soustraction", getSubstractions);
algebraRouter.get("/multiplication", getMultiplications);
algebraRouter.get("/random", getMathQuestions);

geometryRouter.get("/area-and-perimeter", getAreaAndPerimeterQuestions);

export { algebraRouter, geometryRouter };
