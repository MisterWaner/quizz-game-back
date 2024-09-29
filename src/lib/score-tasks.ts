import cron from "node-cron";
import { fetchUsers } from "../controllers/user-controller";
import sql from "better-sqlite3";

const db = sql("quizz.db");

//Réinitialise les scores journaliers de tous les utilisateurs tous les jours à minuit
cron.schedule("0 0 * * *", () => {
    const users = fetchUsers();
    users.forEach((user) => {
        db.prepare(
            "UPDATE users SET current_month_score = current_month_score + score, score = 0 WHERE id = ?"
        ).run(user.id);
    });
    console.log("Scores journaliers réinitialisés");
});

//Réinitialise les scores globaux de tous les utilisateurs tous les 1ers jours de chaque mois à minuit
cron.schedule("0 0 1 * *", () => {
    const users = fetchUsers();
    users.forEach((user) => {
        db.prepare(
            "UPDATE users SET last_month_score = current_month_score + last_month_score WHERE id = ?"
        ).run(user.id);
        db.prepare("UPDATE users SET current_month_score = 0 WHERE id = ?").run(
            user.id
        );
    });
    console.log("Scores mensuels réinitialisés");
});
