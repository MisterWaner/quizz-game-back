export type Question = {
    id: number;
    question: string;
    answer: string | string[];
    subject_id: number;
}

export type QCMQuestion = {
    id: number;
    question: string;
    options: string[];
    correct_answer: string;
    subject_id: number;
}

export type User = {
    id?: number,
    username: string,
    password: string,
    isRegistered: boolean,
    score: number,
    current_month_score: number,
    last_month_score: number,
}

export type Subject = {
    id: number,
    name: string,
}

export type UserSubjectScore = {
    id?: number,
    user_id: number,
    subject_id: number,
    score: number
}
