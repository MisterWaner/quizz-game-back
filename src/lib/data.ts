import sql from "better-sqlite3";

const db = new sql("quizz.db");

export function initDb() {
    db.exec(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, score INTEGER)"
    );
    console.log("Base de données créée");
}
