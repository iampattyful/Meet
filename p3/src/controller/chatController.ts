import { ChatRouters } from "../routes/routes";
import express from "express";
import { errorHandler } from "../error";
import { chatService } from "../service/chatService";
export class ChatController extends ChatRouters {
  async getFrdUserData(req: express.Request, res: express.Response) {
    try {
      let userId = req.session.userId!;
      let groupId = Number(req.params.groupId);
      let result = await chatService.getFrdUserData(userId, groupId);

      res.json({
        data: result,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
  async getChatRoomGroup(req: express.Request, res: express.Response) {
    try {
      let userId = req.session.userId!;

      let result = await chatService.getChatRoomGroup(userId);
      res.json({
        data: result,
        userId: userId,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
  async getRoomMess(req: express.Request, res: express.Response) {
    try {
      let userId = req.session.userId!;
      let groupId = Number(req.params.groupId);

      if (! await chatService.validUserIdWithGroupId(userId, groupId)) {
        throw Error("userID validation error!")
      }

      let result = await chatService.getRoomMess(userId, groupId);
      res.json({
        data: result,
        userId: userId,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
