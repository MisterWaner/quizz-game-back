import sql from "better-sqlite3";
import { Request, Response } from "express";
import { User, DailyUser } from "../types";
import { hashPassword } from "../lib/helpers";

const db = sql("quizz.db");

function fetchUsers(): User[] | DailyUser[] {
    return db.prepare("SELECT * FROM users").all() as User[];
}

function fetchUser(id: number): User | undefined {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;
}

async function createUser(req: Request, res: Response) {
    try {
        const { username, password } = req.body as User;
        const confirmation: string = req.body.confirmation;
        let isRegistered: number;

        if (!username || !password) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const userExists = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Ce nom d'utilisateur existe déjà" });
        }

        if (confirmation !== password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        isRegistered = 1;
        const hashedPassword = await hashPassword(password);

        const user = db
            .prepare(
                "INSERT INTO users (username, password, isRegistered) VALUES (?, ?, ?)"
            )
            .run(username, hashedPassword, isRegistered);

        return res
            .status(201)
            .json({ user, message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while creating the user",
        });
    }
}

async function createDailyUser(req: Request, res: Response) {
    try {
        const { username } = req.body as DailyUser;
        let isRegistered: number;

        if (!username) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const userExists = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Ce nom d'utilisateur existe déjà" });
        }
        isRegistered = 0;

        const dailyUser = db
            .prepare("INSERT INTO users (username, isRegistered) VALUES (?, ?)")
            .run(username, isRegistered);

        return res
            .status(201)
            .json({ dailyUser, message: "Utilisateur créé avec succès" });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while creating the user",
        });
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const users = fetchUsers();

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

async function getUserById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        const user = fetchUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching user",
        });
    }
}

async function updateUserUsername(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const { username } = req.body as User;

        if (!username) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const user = fetchUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        const userExists = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Ce nom d'utilisateur existe déjà" });
        }

        db.prepare("UPDATE users SET username = ? WHERE id = ?").run(
            username,
            id
        );

        return res.status(200).json({
            message: "Utilisateur modifié avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while updating the user",
        });
    }
}

async function updateUserScore(req: Request, res: Response) {
    try {
        const { id, score } = req.body as { id: number, score: number };

        const user = fetchUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        if (score < 0) {
            return res.status(400).send("Score invalide");
        }

        const updatedUser = db.prepare("UPDATE users SET score = ? WHERE id = ?").run(score, id);
        return res.status(200).json({
            message: "Score mis à jour avec succès",
            updatedUser,
        });
    } catch (error) {
        
    }
}

function deleteUser(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user = fetchUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        db.prepare("DELETE FROM users WHERE id = ? AND isRegistered = ?").run(id, 1);

        return res.status(200).json({
            message: "Utilisateur supprimé avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while deleting the user",
        });
    }
}

function deleteDailyUser(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user = fetchUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        db.prepare("DELETE FROM users WHERE id = ? AND isRegistered = ?").run(id, 0);

        return res.status(200).json({
            message: "Utilisateur supprimé avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while deleting the user",
        });
    }
}

function deleteDailyUsers(req: Request, res: Response) {
    try {
        const users = fetchUsers();
        const isRegistered = 0;
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé",
            });
        }

        db.prepare("DELETE * FROM users WHERE isRegistered = ?").run(isRegistered);

        return res.status(200).json({
            message: "Utilisateurs supprimés avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while deleting the users",
        });
    }
}

export { createUser, createDailyUser, getUsers, getUserById, updateUserUsername, updateUserScore, deleteUser, deleteDailyUser, deleteDailyUsers };
