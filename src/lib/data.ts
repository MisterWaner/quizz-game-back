import sql from "better-sqlite3";

const db = new sql("quizz.db");

export function initDb() {
    db.exec(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, score INTEGER DEFAULT 0, global_score INTEGER DEFAULT 0, isRegistered INTEGER)"
    );
    console.log("Base de données créée");
}
