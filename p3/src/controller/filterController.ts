import express from "express";
import { errorHandler } from "../error";
import { FilterForm } from "../model";
import { FilterRoutes } from "../routes/routes";
import { filterService } from "../service/filterService";

export class FilterController extends FilterRoutes {
  constructor() {
    super();
  }

  async filter(req: express.Request, res: express.Response) {
    try {
      let obj: FilterForm = req.body;
      let result = await filterService.filter(obj);
      res.json({
        data: result,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
