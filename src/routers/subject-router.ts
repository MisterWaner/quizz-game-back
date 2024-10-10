import { Router } from "express";
import { createSubject, getSubjects, getSubjectById, updateSubjectName, deleteSubject } from "../controllers/subject-controller";

const subjectRouter = Router();

subjectRouter.get("/", getSubjects);
subjectRouter.get("/:id", getSubjectById);
subjectRouter.post("/", createSubject);
subjectRouter.put("/:id", updateSubjectName);
subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter;