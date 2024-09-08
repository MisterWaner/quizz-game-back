import sql from "better-sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { User } from "../types";

config();

const db = sql("quizz.db");

export async function hashPassword(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

async function comparePassword(
    password: string,
    hashed: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
}

export async function authenticateUser(username: string, password: string) {
    const user: User = db
        .prepare("SELECT * FROM users WHERE username = ?")
        .get(username) as User;
    if (!user) return null;

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) return null;

    return user;
}

export async function generateToken(user: User | undefined): Promise<string> {
    const maxAge: number = 3600000; // 1 hour
    const secret: string = process.env.JWT_SECRET || "";
    const token = jwt.sign(
        {
            userId: user?.id,
            username: user?.username,
            isRegistered: user?.isRegistered,
            global_score: user?.global_score,
            score: user?.score,
        },
        secret,
        {
            expiresIn: maxAge,
        }
    );
    return token; 
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Token manquant" });
    }

    try {
        const secret: string = process.env.JWT_SECRET || "";
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
}
