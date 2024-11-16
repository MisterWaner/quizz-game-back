import { Question, Subject, QCMQuestion } from "../types";
import { fetchSubjects } from "../controllers/subject-controller";
import { shuffleArray } from "../lib/helpers";

export class MathematicsQuestions {
    subjects: Subject[] = fetchSubjects();
    generateRandomAddition = (): Question => {
        const subjectId = this.subjects[0].id;
        const id = Math.floor(Math.random() * 1000);
        const number1: number = Math.floor(Math.random() * 100);
        const number2: number = Math.floor(Math.random() * 100);
        const question = `Quel est le résultat de ${number1} + ${number2} ?`;
        const answer = (number1 + number2).toString();

        return { id, question, correct_answer: answer, subject_id: subjectId };
    };
    generateRandomSubstraction = (): Question => {
        const subjectId = this.subjects[0].id;
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

        return { id, question, correct_answer: answer, subject_id: subjectId };
    };
    generateRandomMultiplication = (): Question => {
        const subjectId = this.subjects[0].id;
        const id = Math.floor(Math.random() * 1000);
        const number1: number = Math.floor(Math.random() * 10);
        const number2: number = Math.floor(Math.random() * 10);
        const question = `Quel est le résultat de ${number1} x ${number2} ?`;
        const answer = (number1 * number2).toString();

        return { id, question, correct_answer: answer, subject_id: subjectId };
    };
    generateRandomCalculation = (): Question => {
        const subjectId = this.subjects[0].id;
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

        return { ...question, subject_id: subjectId };
    };

    generateAreaQuestion = (): QCMQuestion => {
        const subjectId = this.subjects[0].id;
        let question = ``;
        const id = Math.floor(Math.random() * 1000);
        const side1: number = Math.floor(Math.random() * 10);
        const side2: number = Math.floor(Math.random() * 10);
        const correctAnswer = side1 * side2;
        let options = [
            correctAnswer.toString() + "m²",
            (side1 + side2).toString() + "m²",
            (side1 * side2 + 10).toString() + "m²",
            (side1 * side2 - 10).toString() + "m²",
        ];
        options = shuffleArray(options);

        if (side1 === side2) {
            question = `Quelle est l'aire d'un carré de ${side1}m de côté ?`;
        } else {
            question = `Quelle est l'aire d'un rectangle de ${side1}m de long et ${side2}m de large ?`;
        }

        return {
            question,
            options: options,
            correct_answer: correctAnswer.toString() + "m²",
            subject_id: subjectId,
            id,
        };
    };

    generatePerimeterQuestion = (): QCMQuestion => {
        const subjectId = this.subjects[0].id;
        let question = ``;
        let correctAnswer: number;
        const id = Math.floor(Math.random() * 1000);
        const side1: number = Math.floor(Math.random() * 10);
        const side2: number = Math.floor(Math.random() * 10);

        if (side1 === side2) {
            question = `Quelle est le perimètre d'un carré de ${side1}m de côté ?`;
            correctAnswer = 4 * side1;
        } else {
            question = `Quelle est le perimètre d'un rectangle de ${side1}m de long et ${side2}m de large ?`;
            correctAnswer = 2 * (side1 + side2);
        }

        let options = [
            correctAnswer.toString() + "m",
            (correctAnswer + 10).toString() + "m",
            (correctAnswer - 10).toString() + "m",
            (correctAnswer / 2).toString() + "m",
        ];
        options = shuffleArray(options);

        return {
            question,
            options: options,
            correct_answer: correctAnswer.toString() + "m",
            subject_id: subjectId,
            id,
        };
    };

    generateAreaAndPerimeterQuestion = (): QCMQuestion => {
        const subjectId = this.subjects[0].id;
        const type: number = Math.floor(Math.random() * 3);
        let question: QCMQuestion;

        switch (type) {
            case 0:
                question = this.generateAreaQuestion();
                break;
            case 1:
                question = this.generatePerimeterQuestion();
                break;
            default:
                question = this.generateAreaQuestion();
                break;
        }

        return { ...question, subject_id: subjectId };
    };
}
