import { Request, Response } from "express";
import { Question } from "../types";

const generateRandomAddition = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const number1: number = Math.floor(Math.random() * 100);
    const number2: number = Math.floor(Math.random() * 100);
    const question = `Quel est le résultat de ${number1} + ${number2} ?`;
    const answer = (number1 + number2).toString();

    return { id, question, answer };
};

const generateRandomSubstraction = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    let number1: number = Math.floor(Math.random() * 100);
    let number2: number = Math.floor(Math.random() * 100);

    if (number1 < number2) {
        const temp = number1;
        number1 = number2;
        number2 = temp;
    }
    const question = `Quel est le résultat de ${number1} - ${number2} ?`;
    const answer = (number1 - number2).toString();

    return { id, question, answer };
};

const generateRandomMultiplication = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const number1: number = Math.floor(Math.random() * 10);
    const number2: number = Math.floor(Math.random() * 10);
    const question = `Quel est le résultat de ${number1} x ${number2} ?`;
    const answer = (number1 * number2).toString();

    return { id,question, answer };
};

const generateRandomMathQuestion = (): Question => {
    const type: number = Math.floor(Math.random() * 3);
    let question: Question;

    switch (type) {
        case 0:
            question = generateRandomAddition();
            break;
        case 1:
            question = generateRandomSubstraction();
            break;
        case 2:
            question = generateRandomMultiplication();
            break;
        default:
            question = generateRandomAddition();
            break;
    }

    return question;
};

export const getAdditions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        generateRandomAddition
    );
    return res.json(questions);
};

export const getSubstractions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        generateRandomSubstraction
    );
    return res.json(questions);
};

export const getMultiplications = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        generateRandomMultiplication
    );
    return res.json(questions);
};

export const getMathQuestions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from(
        { length: 10 },
        generateRandomMathQuestion
    );
    return res.json(questions);
};
