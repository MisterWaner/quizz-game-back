import { Request, Response } from "express";
import { Question } from "../types";

const generateRandomAddition = (): Question => {
    const number1: number = Math.floor(Math.random() * 100);
    const number2: number = Math.floor(Math.random() * 100);
    const question = `Quel est la somme de ${number1} et ${number2} ?`;
    const answer = (number1 + number2).toString();

    return { question, answer };
};

const generateRandomSubstraction = (): Question => {
    let number1: number = Math.floor(Math.random() * 100);
    let number2: number = Math.floor(Math.random() * 100);
    
    if (number1 < number2) {
        const temp = number1;
        number1 = number2;
        number2 = temp;
    }
    const question = `Quel est la différence entre ${number1} et ${number2} ?`;
    const answer = (number1 - number2).toString();

    return { question, answer };
};

const generateRandomMultiplication = (): Question => {
    const number1: number = Math.floor(Math.random() * 10);
    const number2: number = Math.floor(Math.random() * 10);
    const question = `Quel est le produit de ${number1} et ${number2} ?`;
    const answer = (number1 * number2).toString();

    return { question, answer };
};

// const generateRandomDivision = (): Question => {
//     let number1: number = Math.floor(Math.random() * 10);
//     let number2: number = Math.floor(Math.random() * 10);

//     if (number1 < number2) {
//         const temp = number1;
//         number1 = number2;
//         number2 = temp;
//     }

//     const question = `Quel est le quotient de ${number1} et ${number2} ?`;
//     const answer = (number1 / number2).toPrecision(1);

//     return { question, answer };
// };

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
}

export const getAdditions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from({length: 10}, generateRandomAddition);
    return res.json(questions);
}

export const getSubstractions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from({length: 10}, generateRandomSubstraction);
    return res.json(questions);
}

export const getMultiplications = (req: Request, res: Response) => {
    const questions: Question[] = Array.from({length: 10}, generateRandomMultiplication);
    return res.json(questions);
}

// export const getDivisions = (req: Request, res: Response) => {
//     const questions: Question[] = Array.from({length: 10}, generateRandomDivision);
//     return res.json(questions);
// }

export const getMathQuestions = (req: Request, res: Response) => {
    const questions: Question[] = Array.from({length: 10}, generateRandomMathQuestion);
    return res.json(questions);
}
