import express from "express";

class Routes {
  routes: express.Router = express.Router();
}

export abstract class UserRoutes extends Routes {
  constructor() {
    super();
    this.routes.post("/login", this.login);
    this.routes.post("/logout", this.logout);
    // this.routes.get("/filter/:id", this.filter); // filter by users table? pass data in HTTP Request by query or params? with :id or not? cms recommend use query for filter function
    // eg?gender=male&age=20&height=170
    // this.routes.post("/edit_profile/:id", this.edit_profile); // pass data in HTTP Request by query
  }

  public abstract login(req: express.Request, res: express.Response): any;
  public abstract logout(req: express.Request, res: express.Response): any;
  //   public abstract filter(req: express.Request, res: express.Response): any;
  //   public abstract edit_profile(
  //     req: express.Request,
  //     res: express.Response
  //   ): any;
}
