import { Router } from "express";
import {
    getUsers,
    getUserById,
    createUser,
    createDailyUser,
    updateUserUsername,
    updateUserScore,
    deleteUser,
    deleteDailyUser,
    
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.post("/daily", createDailyUser);
userRouter.put("/:id", updateUserUsername);
userRouter.put("/:id/score", updateUserScore);
userRouter.delete("/:id", deleteUser);
userRouter.delete("/daily/:id", deleteDailyUser);

export default userRouter;