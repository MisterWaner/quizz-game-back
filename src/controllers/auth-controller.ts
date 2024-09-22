import { Request, Response } from "express";
import { User } from "../types";
import { authenticateUser, generateToken } from "../lib/helpers";

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body as User;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Pseudo ou mot de passe manquant" });
        }
        const user = await authenticateUser(username, password);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Mot de passe ou pseudo incorrect" });
        } else {
            const token = await generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3600000,
            });
            res.status(200).json({
                token: token,
                message: "Authentification réussie",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error,
            message: "Impossibilité de se connecter",
        });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });
        return res.status(200).json("Déconnexion réussie");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la déconnexion",
            error,
        });
    }
}
