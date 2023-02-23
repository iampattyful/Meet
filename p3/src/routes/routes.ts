import express from "express";
import { isLoggedInAPI } from "../guard";
class Routes {
  routes: express.Router = express.Router();
}

export abstract class UserRoutes extends Routes {
  constructor() {
    super();
    this.routes.post("/login", this.login);
    this.routes.post("/logout", this.logout);
  }

  public abstract login(req: express.Request, res: express.Response): any;
  public abstract logout(req: express.Request, res: express.Response): any;
}

export abstract class HomeRoutes extends Routes {
  constructor() {
    super();
    this.routes.get("/homePageImage", isLoggedInAPI, this.homePageImage);
  }

  public abstract homePageImage(
    req: express.Request,
    res: express.Response
  ): any;
}
