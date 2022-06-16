import { AppDataSource } from "../data-source";

AppDataSource.initialize().then(() => console.log("📦 Connected with the database!"));
