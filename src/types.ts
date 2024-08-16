export type Question = {
    id: number;
    question: string;
    answer: string;
}

export type User = {
    id?: number,
    username: string,
    password: string,
    isRegistered: boolean,
    score: number,
    global_score: number,
}

export type DailyUser = {
    id?: number,
    username: string,
    isRegistered: boolean,
    score: number,
    global_score: number,
}