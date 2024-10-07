import sql from "better-sqlite3";
import { Request, Response } from "express";

import { User } from "../types";

const db = sql("quizz.db");

function fetchUsersDailyScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY score DESC")
        .all() as User[];
}

function fetchUsersGlobalScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY current_month_score DESC")
        .all() as User[];
}

function fetchTop5DailyScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY score DESC LIMIT 5")
        .all() as User[];
}

function fetchTop5GlobalScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY current_month_score DESC LIMIT 5")
        .all() as User[];
}

function getUsersDailyScore(req: Request, res: Response) {
    try {
        const users = fetchUsersDailyScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

function getUsersGlobalScore(req: Request, res: Response) {
    try {
        const users = fetchUsersGlobalScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

function getTop5DailyScore(req: Request, res: Response) {
    try {
        const users = fetchTop5DailyScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

function getTop5GlobalScore(req: Request, res: Response) {
    try {
        const users = fetchTop5GlobalScore();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching users",
        });
    }
}

export {
    getUsersDailyScore,
    getUsersGlobalScore,
    getTop5DailyScore,
    getTop5GlobalScore,
};
