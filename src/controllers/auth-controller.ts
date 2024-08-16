import { Request, Response } from "express";
import { User } from "../types";
import { authenticateUser } from "../lib/helpers";

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body as User;
        if (!username || !password) {
            return res.status(400).json({ message: "Missing parameters" });
        }
        const user = await authenticateUser(username, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        res.status(200).json({ user, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while logging in",
        });
    }
}