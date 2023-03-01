import express from "express";
import { UserController } from "./controller/userController";
import { FilterController } from "./controller/filterController";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";
import path from "path";
import { MeetController } from "./controller/meetController";
// import SocketIO from "socket.io";
import http from "http";
import { knex } from "./db";
// import { IOServer } from "./IOServer.ts";

const app = express();
const server = http.createServer(app);
// const io = new SocketIO.Server(server);
// export const ioServer = new IOServer(io, sessionMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

let p2 = path.join(__dirname, "../uploads");
app.use(express.static(p2));
let p = path.join(__dirname, "../public");
app.use(express.static(p));

let userController = new UserController();
let meetController = new MeetController();
let filterController = new FilterController();
app.use("/user", userController.routes);
app.use("/meet", meetController.routes);
app.use("/filter", filterController.routes);

app.get("/test", async (req: express.Request, res: express.Response) => {
  // const subquery = await knex("liked")
  //   .select("liked_to")
  //   .where("liked_from", 1);

  // const matchedUsers = await knex("users")
    // .distinct("*")
    // .join("liked", "users.id", "=", "liked.liked_from")
    // .join("chatroom", "users.id", "=", "chatroom.user_id")
    // .select(
    //   "liked.liked_from as id",
    //   "users.username",
    //   "users.user_icon",
    //   "chatroom.message as last_message"
    // )
    // .whereIn("liked_from", function () {
    //   this.select("liked_to").from("liked").where("liked_from", 71);
    // })
    // .where("liked_to", 71)
    // .orderBy([
    //   { column: "liked.created_at", order: "desc" },
    //   { column: "chatroom.created_at", order: "desc" },
    // ]);


    const matchedUsers = await knex("message")
    .join("users","users.id","=","message.user_id")
    .join("group","group.id","=","message.group_id")
    .select("message.message")
    .max("message.created_at","desc")
    .where("group.match_user_id1",83)
    .orWhere("group.matched_user_id2",83)
    .orderBy("group.created_at","desc")
    

  //.distinct("liked.liked_from");
  // .limit(1)

  res.json(matchedUsers);
});

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});

server.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
