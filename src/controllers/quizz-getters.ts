import { MathQuestions, GeometryQuestions } from "./quizz-controller";
import { Request, Response } from "express";
import { Question, QCMQuestion } from "../types";

const mathQuestions = new MathQuestions();
const geometryQuestions = new GeometryQuestions();
export const getAdditions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathQuestions.generateRandomAddition
    );
    return res.json(questions);
};

export const getSubstractions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathQuestions.generateRandomSubstraction
    );
    return res.json(questions);
};

export const getMultiplications = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathQuestions.generateRandomMultiplication
    );
    return res.json(questions);
};

export const getMathQuestions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathQuestions.generateRandomMathQuestion
    );
    return res.json(questions);
};

export const getAreaAndPerimeterQuestions = (req: Request, res: Response) => {
    const questions: QCMQuestion[] = Array.from(
        { length: 10 },
        geometryQuestions.generateAreaAndPerimeterQuestion
    );

    return res.json(questions);
};
