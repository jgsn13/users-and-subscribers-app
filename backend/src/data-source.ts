import dotenv from "dotenv";
dotenv.config()
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB),
  entities: [ // models
    "src/models/*.{js,ts}",
  ],
  migrations: [
    "src/database/migrations/*.{js,ts}",
  ],
})
