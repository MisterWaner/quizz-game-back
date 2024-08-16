import { Router } from "express";
import {
    getUsersDailyScore,
    getUsersGlobalScore,
} from "../controllers/score-controller";

const scoreRouter = Router();

scoreRouter.get("/daily", getUsersDailyScore);
scoreRouter.get("/global", getUsersGlobalScore);

export default scoreRouter;