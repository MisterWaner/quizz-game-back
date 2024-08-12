import sql from "better-sqlite3";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { User } from "../types";

config();

const db = sql("quizz.db");

export async function hashPassword(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

async function comparePassword(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
}

export async function authenticateUser(username: string, password: string) {
    const user: User = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as User;
    if (!user) return null;

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) return null;

    return user;
}