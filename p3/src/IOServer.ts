import SocketIO from "socket.io";
import express, { RequestHandler } from "express";
import knex from "knex";

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

      async function matched() {
        try {
          const subquery = await knex("liked")
            .select("liked_to")
            .where("liked_from", req.session.userId);
          const matchedUsers = await knex("liked")
            .join("users", "users.id", "=", "liked.liked_from")
            .select("liked.liked_from", "users.username", "users.user_icon")
            .whereIn("liked_from", subquery)
            .where("liked_to", req.session.userId)
            .orderBy("liked.created_at", "desc");
          return matchedUsers;
        } catch (err) {
          throw new Error(err.message);
        }
      }

      this.io.emit("matched", {
        matchedUserList: "",
      });

      
    });
  }
}
