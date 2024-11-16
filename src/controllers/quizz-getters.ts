import { MathematicsQuestions } from "./math-controller";
import { Request, Response } from "express";
import { Question, QCMQuestion } from "../types";

const mathematicsQuestions = new MathematicsQuestions();

export const getAdditions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathematicsQuestions.generateRandomAddition
    );
    return res.json(questions);
};

export const getSubstractions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathematicsQuestions.generateRandomSubstraction
    );
    return res.json(questions);
};

export const getMultiplications = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathematicsQuestions.generateRandomMultiplication
    );
    return res.json(questions);
};

export const getRandomCalculations = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        mathematicsQuestions.generateRandomCalculation
    );
    return res.json(questions);
};

export const getAreaAndPerimeterQuestions = (req: Request, res: Response) => {
    const questions: QCMQuestion[] = Array.from(
        { length: 10 },
        mathematicsQuestions.generateAreaAndPerimeterQuestion
    );

    return res.json(questions);
};
