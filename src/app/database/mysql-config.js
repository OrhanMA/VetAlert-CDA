import mysql from "mysql";

/**
 * Création d'un pool MySQL pour réutiliser les connexions ouvertes au lieu d'en superposer.
 * Config avec les variables d'environnement:
 * .env pour la version build / prod
 * .env.local en développement
 */
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 1000,
});
