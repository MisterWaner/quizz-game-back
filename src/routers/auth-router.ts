import { Router, Request, Response } from "express";
import { login, logout } from "../controllers/auth-controller";
import { updateUserCurrentMonthScore } from "../controllers/user-controller";
import { verifyToken } from "../lib/helpers";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-current-month-score", updateUserCurrentMonthScore);
authRouter.get("/check-auth", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({
        user: (req as any).user,
        message: "Authentification réussie",
    })
})

export default authRouter;