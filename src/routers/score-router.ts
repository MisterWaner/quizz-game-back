import { Router } from "express";
import {
    getUsersDailyScore,
    getUsersGlobalScore,
    getTop5DailyScore,
    getTop5GlobalScore,
} from "../controllers/score-controller";

const scoreRouter = Router();

scoreRouter.get("/daily", getUsersDailyScore);
scoreRouter.get("/global", getUsersGlobalScore);
scoreRouter.get("/daily-five", getTop5DailyScore);
scoreRouter.get("/global-five", getTop5GlobalScore);

export default scoreRouter;