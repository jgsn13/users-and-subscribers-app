import express from "express";
import routes from "./routes/index"

class Server {
  public app = express();

  constructor() {
    this.app.use(express.json());
    this.middlewares();
    this.routes();
  }

  private middlewares() {

  }

  private routes() {
    this.app.use(routes)
  }

}

export default new Server().app;
