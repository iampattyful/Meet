<<<<<<< HEAD
import express from "express";
import { isLoggedInAPI } from "../guard";
=======
import express from "express"
import { isLoggedInAPI } from "../guard"

>>>>>>> cc0b249e5be708ddddbaf6aa568d720d7c526e92
class Routes {
  routes: express.Router = express.Router();
}

<<<<<<< HEAD
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
=======
export abstract class UserRoutes extends Routes{
    constructor(){
        super()
        this.routes.post('/login',this.login)
        this.routes.post('/logout',isLoggedInAPI,this.logout)
        this.routes.post('/enroll',this.enroll)
        this.routes.post('/getCurrentUser',isLoggedInAPI,this.getCurrentUser)
    }

    public abstract login(req:express.Request,res:express.Response):any
    public abstract logout(req:express.Request,res:express.Response):any
    public abstract enroll(req:express.Request,res:express.Response):any
    public abstract getCurrentUser(req:express.Request,res:express.Response):any
}
>>>>>>> cc0b249e5be708ddddbaf6aa568d720d7c526e92
