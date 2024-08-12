import sql from "better-sqlite3";
import { Request, Response } from "express";
import { User } from "../types";
import { hashPassword } from "../lib/helpers";

const db = sql("quizz.db");

async function createUser(req: Request, res: Response) {
    try {
        const { username, password } = req.body as User;
        if (!username || !password) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const confirmation: string = req.body.confirmation;

        if (confirmation !== password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = hashPassword(password);

        const userExists = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);

        return res.status(201).json({user, message: "User created successfully"});

    } catch (error) {
        return res.status(500).json({error, message: "An error occurred while creating the user"});
    }
}