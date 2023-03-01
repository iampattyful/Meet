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

  // const matchedUsers = await knex("message")
  // .join("users","users.id","=","message.user_id")
  // .join("group","group.id","=","message.group_id")
  // .select("group.id","users.username","users.user_icon","message.message","message.created_at")
  // .where("group.matched_user_id1",89)
  // .orWhere("group.matched_user_id2",89)
  // .orderBy("message.created_at","desc")
  // .groupBy("group.id","users.username","users.user_icon","message.message")
  // .max("message.created_at")

  // const subquery = await knex ("message")
  // .join("group","group_id","=","group.id")
  // .select("group_id")
  // .max("message.created_at")
  // .groupBy("group_id")

  // const matchedUsers = await knex("message")
  // .join(function(){
  //   this.select("group_id")
  //   .max("message.created_at")
  //   .from("message")
  //   .join("group","group_id","=","group.id")
  //   .groupBy("group_id")
  //   .as("user_message")
  // },"message.group_id","user_message.group_id")
  // .join("users","users.id","message.user_id")
  // .select("user_message.group_id","users.user_icon","users.username","message.message")
  // .where("user_message.max","=","message.created_at")
  // .orderBy("user_message.max","desc")

  const matchedUsers = (
    await knex.raw(
     `select user_message.group_id, users.user_icon, users.username, message.message, user_message.max from (select group_id, max(message.created_at) from message, "group" where group_id = "group".id and "group".matched_user_id1 = 89 or "group".matched_user_id2 = 89 group by group_id) as user_message, message, users where user_message.group_id = message.group_id and user_message.max = message.created_at and users.id = message.user_id order by user_message.max desc`
    )
  ).rows;

  res.json(matchedUsers);
});

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});

server.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
