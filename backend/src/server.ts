import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import "./database/connection";

import routes from "./routes"
import requestLogger from "./middlewares/requestLogger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}!`);
});
