import sql from "better-sqlite3";
import { Request, Response } from "express";
import { Subject } from "../types";

const db = sql("quizz.db");

function fetchSubjects(): Subject[] {
    return db.prepare("SELECT * FROM subjects").all() as Subject[];
}

function fetchSubjectById(id: number): Subject | undefined {
    return db.prepare("SELECT * FROM subjects WHERE id = ?").get(id) as Subject;
}

function createSubject(req: Request, res: Response) {
    try {
        const { name } = req.body as Subject;

        if (!name) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const subjectExists = db
            .prepare("SELECT * FROM subjects WHERE name = ?")
            .get(name);

        if (subjectExists) {
            return res
                .status(409)
                .json({ message: "Ce nom de sujet existe déjà" });
        }

        const newSubject = db
            .prepare("INSERT INTO subjects (name) VALUES (?)")
            .run(name);

        return res
            .status(201)
            .json({
                subject: newSubject,
                message: "Subject created successfully",
            });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while creating the subject",
        });
    }
}

async function getSubjects(req: Request, res: Response) {
    try {
        const subjects = fetchSubjects();

        if (subjects.length === 0) {
            return res.status(404).json({
                message: "Aucune matière trouvée",
            });
        }

        return res.status(200).json(subjects);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching subjects",
        });
    }
}

async function getSubjectById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        const subject = fetchSubjectById(id);

        if (!subject) {
            return res.status(404).json({
                message: "matière introuvable",
            });
        }

        return res.status(200).json(subject);
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while fetching subject",
        });
    }
}

function updateSubjectName(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const { name } = req.body as Subject;

        if (!name) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const subject = fetchSubjectById(id);

        if (!subject) {
            return res.status(404).json({
                message: "matière introuvable",
            });
        }

        const subjectExists = db
            .prepare("SELECT * FROM subjects WHERE name = ?")
            .get(name);
        if (subjectExists) {
            return res
                .status(400)
                .json({ message: "Ce nom de matière existe déjà" });
        }

        db.prepare("UPDATE subjects SET name = ? WHERE id = ?").run(
            name,
            id
        );

        return res.status(200).json({
            message: "Sujet modifié avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while updating the subject",
        });
    }
}

async function deleteSubject(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const subject = fetchSubjectById(id);

        if (!subject) {
            return res.status(404).json({
                message: "matière introuvable",
            });
        }

        db.prepare("DELETE FROM subjects WHERE id = ? AND isRegistered = ?").run(
            id,
            1
        );

        return res.status(200).json({
            message: "matière supprimée avec succès",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            message: "An error occurred while deleting the subject",
        });
    }
}

export {
    fetchSubjects,
    fetchSubjectById,
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubjectName,
    deleteSubject,
};
