import express from "express";
import { isLoggedInAPI } from "../guard";

class Routes {
  routes: express.Router = express.Router();
}

export abstract class UserRoutes extends Routes {
  constructor() {
    super();
    this.routes.post("/login", this.login);
    this.routes.post("/logout", isLoggedInAPI, this.logout);
    this.routes.post("/enroll", this.enroll);
    this.routes.post("/getCurrentUser", isLoggedInAPI, this.getCurrentUser);
  }

  public abstract login(req: express.Request, res: express.Response): any;
  public abstract logout(req: express.Request, res: express.Response): any;
  public abstract enroll(req: express.Request, res: express.Response): any;
  public abstract getCurrentUser(
    req: express.Request,
    res: express.Response
  ): any;
}

export abstract class HomeRoutes extends Routes {
  constructor() {
    super();
    this.routes.get("/homePageIcon", isLoggedInAPI, this.homePageIcon);
    this.routes.put("/likeUser", isLoggedInAPI, this.likeUser);
  }

  public abstract homePageIcon(req: express.Request, res: express.Request): any;
  public abstract likeUser(req: express.Request, res: express.Response): any;
}
