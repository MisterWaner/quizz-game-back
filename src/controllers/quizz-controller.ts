import { Question } from "../types";
import { subjects } from "../lib/subjectsData";

export class MathQuestions {
    constructor() {}
    generateRandomAddition = (): Question => {
        const subjectId = subjects[0].id;
        const id = Math.floor(Math.random() * 1000);
        const number1: number = Math.floor(Math.random() * 100);
        const number2: number = Math.floor(Math.random() * 100);
        const question = `Quel est le résultat de ${number1} + ${number2} ?`;
        const answer = (number1 + number2).toString();

        return { id, question, answer, subject_id: subjectId };
    };
    generateRandomSubstraction = (): Question => {
        const subjectId = subjects[0].id;
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

        return { id, question, answer, subject_id: subjectId };
    };
    generateRandomMultiplication = (): Question => {
        const subjectId = subjects[0].id;
        const id = Math.floor(Math.random() * 1000);
        const number1: number = Math.floor(Math.random() * 10);
        const number2: number = Math.floor(Math.random() * 10);
        const question = `Quel est le résultat de ${number1} x ${number2} ?`;
        const answer = (number1 * number2).toString();

        return { id, question, answer, subject_id: subjectId };
    };
    generateRandomMathQuestion = (): Question => {
        const type: number = Math.floor(Math.random() * 3);
        let question: Question;

        switch (type) {
            case 0:
                question = this.generateRandomAddition();
                break;
            case 1:
                question = this.generateRandomSubstraction();
                break;
            case 2:
                question = this.generateRandomMultiplication();
                break;
            default:
                question = this.generateRandomAddition();
                break;
        }

        return question;
    };
}


