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
import { verifyToken } from "../lib/helpers";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyToken, getUserById);
userRouter.post("/", createUser);
userRouter.post("/daily", createDailyUser);
userRouter.put("/:id", verifyToken, updateUserUsername);
userRouter.put("/:id/score", updateUserScore);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.delete("/daily/:id", deleteDailyUser);

export default userRouter;
