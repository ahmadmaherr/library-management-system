import dotenv from "dotenv";

dotenv.config();

export const databaseConfig = {
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE_NAME,
    dialect: process.env.DB_MYSQL_DIALECT,
    minPool: process.env.DB_MIN_POOL,
    maxPool: process.env.DB_MAX_POOL,
};

export const auth = {
  jwt: { secret: process.env.JWT_SECRET }
};

