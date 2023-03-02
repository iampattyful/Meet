import SocketIO from "socket.io";
import express, { RequestHandler } from "express";
import { knex } from "./db";

export class IOServer {
  private users: Map<number, { userId: number; username: string }>;
  constructor(
    private io: SocketIO.Server,
    private sessionMiddleware: RequestHandler
  ) {
    this.io = io;
    this.users = new Map();
    this.io.use((socket, next) => {
      let req = socket.request as express.Request;
      let res = req.res as express.Response;
      this.sessionMiddleware(req, res, next as express.NextFunction);
    });

    this.io.on("connection", async (socket) => {
      const req = socket.request as express.Request;

      socket.use((_: any, next: any) => {
        req.session.reload((err) => {
          if (err) {
            socket.disconnect();
            return;
          } else {
            req.session.save();
            next();
          }
        });
      });

      socket.on("matched", async (data) => {
        try {
            const matchedUsers = (
                await knex.raw(
                 `select user_message.group_id, users.user_icon, users.username, message.message, user_message.max from (select group_id, max(message.created_at) from message, "group" where group_id = "group".id and "group".matched_user_id1 = ${req.session.userId} or "group".matched_user_id2 = ${req.session.userId} group by group_id) as user_message, message, users where user_message.group_id = message.group_id and user_message.max = message.created_at and users.id = message.user_id order by user_message.max desc`
                )
              ).rows;


            io.emit("created matched users list", matchedUsers)
        } catch (err) {
          throw new Error(err.message);
        }
      });

      socket.on("join room",async(data)=>{
        try{
            //select group
            //io.emit("",)
        }catch(err){
            throw new Error(err.message);
        }
      })

      socket.on("disconnect", () => {
        if (req.session.userId) {
          this.users.delete(req.session.userId);
        }
      });
    });
  }
}
