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

export abstract class MeetRouters extends Routes {
  constructor() {
    super();
    this.routes.put("likeUser/:id", isLoggedInAPI, this.likeUser);
    this.routes.get("userInformation/:id", isLoggedInAPI, this.userInformation);
  }
  public abstract userInformation(
    req: express.Request,
    res: express.Response
  ): any;
  public abstract likeUser(req: express.Request, res: express.Response): any;
}

export abstract class FilterRoutes extends Routes {
  constructor() {
    super();
    this.routes.post("/users", this.filter);
  }
  public abstract filter(req: express.Request, res: express.Response): any;
}
