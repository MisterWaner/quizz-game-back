import { MathQuestions } from "./quizz-controller";
import { Request, Response } from "express";
import { Question } from "../types";

const mathQuestions = new MathQuestions();
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
