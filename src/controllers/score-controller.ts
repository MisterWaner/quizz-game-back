import sql from "better-sqlite3";
import { Request, Response } from "express";

import { User } from "../types";

const db = sql("quizz.db");

function fetchUsersDailyScore(): User[] {
    return db.prepare("SELECT * FROM users ORDER BY score DESC").all() as User[];
}

function fetchUsersGlobalScore(): User[] {
    return db.prepare("SELECT * FROM users ORDER BY global_score DESC").all() as User[];
}

function getUsersDailyScore(req: Request, res: Response) {
    try {
        const users = fetchUsersDailyScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

async function getUsersGlobalScore(req: Request, res: Response) {
    try {
        const users = fetchUsersGlobalScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

export { getUsersDailyScore, getUsersGlobalScore };