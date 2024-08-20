import cron from "node-cron";
import { fetchUsers } from "../controllers/user-controller";
import sql from "better-sqlite3";

const db = sql("quizz.db");

//Réinitialise les scores journaliers de tous les utilisateurs tous les jours à minuit
cron.schedule("0 0 * * *", () => {
    const users = fetchUsers();
    users.forEach((user) => {
        db.prepare(
            "UPDATE users SET global_score = global_score + score, score = 0 WHERE id = ?"
        ).run(user.id);
    });
    console.log("Scores journaliers réinitialisés");
});

//Réinitialise les scores globaux de tous les utilisateurs tous les 1ers jours de chaque mois à minuit
cron.schedule("0 0 1 * *", () => {
    const users = fetchUsers();
    users.forEach((user) => {
        db.prepare(
            "UPDATE users SET global_score = 0 WHERE id = ?"
        ).run(user.id);
    });
    console.log("Scores globaux réinitialisés");
});

