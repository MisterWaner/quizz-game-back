import sql from "better-sqlite3";

const db = new sql("quizz.db");

export function initDb() {
    db.exec(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, score INTEGER DEFAULT 0, current_month_score INTEGER DEFAULT 0, last_month_score INTEGER DEFAULT 0, isRegistered INTEGER)"
    );
    db.exec(
        "CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY, name TEXT)"
    );
    db.exec(
        "CREATE TABLE IF NOT EXISTS users_subjects_scores (id INTEGER PRIMARY KEY, user_id INTEGER, subject_id INTEGER, score INTEGER)"
    );
    console.log("Base de données créée");
}
