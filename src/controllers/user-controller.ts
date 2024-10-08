import sql from "better-sqlite3";
import { Request, Response } from "express";
import { User } from "../types";
import { hashPassword } from "../lib/helpers";

const db = sql("quizz.db");

function fetchUsers(): User[] {
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
                .status(409)
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
        const { score, userId } = req.body as { score: number; userId: number };

        const user = fetchUser(userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        if (score < 0) {
            return res.status(400).send("Score invalide");
        }

        const updatedUser = db
            .prepare("UPDATE users SET score = score + ? WHERE id = ?")
            .run(score, userId);
        return res.status(200).json({
            message: "Score mis à jour avec succès",
            updatedUser,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du score", error);
        return res.status(500).send("Erreur serveur");
    }
}

async function updateUserCurrentMonthScore(req: Request, res: Response) {
    try {
        const { userId } = req.body as {
            userId: number;
        };

        const user = fetchUser(userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        const updatedMonthScore = user.current_month_score + user.score;

        const updatedUser = db
            .prepare(
                "UPDATE users SET current_month_score = ?, score = 0 WHERE id = ?"
            )
            .run(updatedMonthScore, userId);

        return res.status(200).json({
            message: "Score mis à jour avec succès",
            updatedUser,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du score", error);
        return res.status(500).send("Erreur serveur");
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

        db.prepare("DELETE FROM users WHERE id = ? AND isRegistered = ?").run(
            id,
            1
        );

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

export {
    fetchUser,
    fetchUsers,
    createUser,
    getUsers,
    getUserById,
    updateUserUsername,
    updateUserScore,
    updateUserCurrentMonthScore,
    deleteUser,
};
