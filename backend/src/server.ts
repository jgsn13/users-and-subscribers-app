import "reflect-metadata";
import express from "express";

import "./database/connection";

import routes from "./routes"
import requestLogger from "./middlewares/requestLogger";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(routes)

const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}!`);
});
