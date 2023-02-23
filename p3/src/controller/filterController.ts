import express from "express";
import { errorHandler } from "../error";
import { UserRoutes } from "../routes/routes";
// import { filterService } from "../service/filterService";

export class FilterController extends UserRoutes {
  constructor() {
    super();
  }
  async filter(req: express.Request, res: express.Response) {
    try {
      //   if (usersRows) {
      //     req.session.isLogin = true;
      //     req.session.userId = usersRows[0].id;
      //     res.json({
      //       data: req.session,
      //       isErr: false,
      //       errMess: null,
      //     });
      //   }
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
