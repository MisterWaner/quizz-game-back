import { Router } from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUserUsername,
    updateUserScore,
    updateUserCurrentMonthScore,
    deleteUser,
} from "../controllers/user-controller";
import { verifyToken } from "../lib/helpers";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyToken, getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", verifyToken, updateUserUsername);
userRouter.put("/:userId/score", updateUserScore);
userRouter.put("/:userId/current-month-score", updateUserCurrentMonthScore);
userRouter.delete("/:id", verifyToken, deleteUser);

export default userRouter;
