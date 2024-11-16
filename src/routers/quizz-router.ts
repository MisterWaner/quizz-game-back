import { Router } from "express";
import {
    getAdditions,
    getAreaAndPerimeterQuestions,
    getRandomCalculations,
    getMultiplications,
    getSubstractions,
} from "../controllers/quizz-getters";

const mathematicsRouter = Router();

mathematicsRouter.get("/addition", getAdditions);
mathematicsRouter.get("/soustraction", getSubstractions);
mathematicsRouter.get("/multiplication", getMultiplications);
mathematicsRouter.get("/random", getRandomCalculations);

mathematicsRouter.get("/area-and-perimeter", getAreaAndPerimeterQuestions);

export { mathematicsRouter };
