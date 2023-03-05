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
    this.routes.get("/getCurrentUser", isLoggedInAPI, this.getCurrentUser);
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
    this.routes.get("/");
    this.routes.put("/likeUser/:id", isLoggedInAPI, this.likeUser);
    this.routes.get("/userInformation/:id", this.userInformation);
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
    this.routes.post("/users", isLoggedInAPI, this.filter);
  }
  public abstract filter(req: express.Request, res: express.Response): any;
}

export abstract class EditProfileRouters extends Routes {
  constructor() {
    super();
    this.routes.get("/loadProfile", this.loadProfileOfUser);
    this.routes.put("/editProfile", this.editProfileOfUser);
  }
  public abstract loadProfileOfUser(
    req: express.Request,
    res: express.Response
  ): any;
  public abstract editProfileOfUser(
    req: express.Request,
    res: express.Response
  ): any;
}

export abstract class ChatRouters extends Routes {
  constructor() {
    super();

    this.routes.get("/getChatRoomGroup", isLoggedInAPI, this.getChatRoomGroup);
    this.routes.get("/getRoomMess/:groupId", isLoggedInAPI, this.getRoomMess);
    this.routes.get(
      "/getFrdUserData/:groupId",
      isLoggedInAPI,
      this.getFrdUserData
    );
  }
  public abstract getChatRoomGroup(
    req: express.Request,
    res: express.Response
  ): any;
  public abstract getRoomMess(req: express.Request, res: express.Response): any;
  public abstract getFrdUserData(
    req: express.Request,
    res: express.Response
  ): any;
}
