import express from "express";
import { UserController } from "./controller/userController";
import { FilterController } from "./controller/filterController";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";
import path from "path";
import { MeetController } from "./controller/meetController";
import { Server, Socket } from "socket.io";
import http from "http";
import { knex } from "./db";
import { EditProfileController } from "./controller/editProfileController";
import { ChatController } from "./controller/chatController";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

io.use((socket, next) => {
  let req = socket.request as express.Request;
  let res = req.res as express.Response;
  sessionMiddleware(req, res, next as express.NextFunction);
});

let socketDB = {};

io.on("connection", async (socket) => {
  let req = socket.request as express.Request;

  console.log({ socketId: socket.id });

  req.session.socketId = socket.id;

  socketDB[String(req.session.userId)] = socket;
  socketDB[socket.id] = req.session.id;

  socket.use((__, next) => {
    req.session.reload((err) => {
      if (err) {
        console.log("socket on middleware err:", err.message);
        socket.disconnect();
        return;
      } else {
        next();
      }
    });
  });

  // send message
  socket.on("sendMessage", async (data) => {
    try {
      let userId = req.session.userId;
      let groupId = data.groupId! as string;

      let groupMate = await knex("group")
        .select("*")
        .where("group.id", groupId)
        .andWhere(function () {
          this.where("group.matched_user_id1", userId).orWhere(
            "group.matched_user_id2",
            userId
          );
        });

      console.log(data, "sendMess");
      await knex("message").insert([
        {
          user_id: req.session.userId,
          group_id: data.groupId,
          message: data.message,
        },
      ]);
      const rows = await knex("group")
        .join("message", "message.group_id", "=", "group.id")
        .join("users", "users.id", "=", "message.user_id")
        .select(
          "message.message",
          "message.created_at",
          "message.user_id",
          "message.group_id",
          "users.username",
          "users.user_icon"
        )
        .where("group.id", data.groupId)
        .andWhere(function () {
          this.where("group.matched_user_id1", userId).orWhere(
            "group.matched_user_id2",
            userId
          );
        })
        .orderBy("message.created_at", "asc");

      // io.emit(`updateSendMessage-${data.groupId}`, rows);

      if (groupMate.length > 0) {
        let groupMateId = "";

        if (parseInt(groupMate[0].matched_user_id1) == userId) {
          groupMateId = String(groupMate[0].matched_user_id2);
        } else {
          groupMateId = String(groupMate[0].matched_user_id1);
        }

        // console.log(socket.rooms);

        (socketDB[String(userId)] as Socket).join(groupId);   
        socket.emit(groupId, rows);     

        (socketDB[groupMateId] as Socket).join(groupId);

        // console.log((socketDB[groupMateId] as Socket).rooms)

        socket.to(groupId).emit(groupId, rows);
      }
    } catch (err) {
      console.log(err.message, "sendMessage with error");
    }
  });

  //updateRoomGroup
  socket.on("updateRoomGroup", async () => {
    try {
      const userId = req.session.userId;
      const rows = await knex("message")
        .join(
          function () {
            this.join("group", "group_id", "=", "group.id")
              .select("group_id")
              .from("message")
              .where("matched_user_id1", userId)
              .orWhere("matched_user_id1", userId)
              .max("message.created_at")
              .groupBy("group_id")
              .as("user_message");
          },
          "user_message.max",
          "=",
          "message.created_at"
        )
        .join("group", "group.id", "=", "message.group_id")
        .join("users", function () {
          this.on("users.id", "=", "matched_user_id1");
          // .orOn("users.id","=","matched_user_id2")
        })
        .join("users AS u2", function () {
          this.on("u2.id", "=", "matched_user_id2");
          // .orOn("users.id","=","matched_user_id2")
        })
        .select(
          "user_message.group_id",
          "message.message",
          "user_message.max",
          "matched_user_id1",
          "matched_user_id2",
          "users.username",
          "u2.username AS username2",
          "users.user_icon",
          "u2.user_icon AS user_icon2"
        )
        // .where("user_message.group_id","message.group_id")
        .orderBy("user_message.max", "desc");
      socket.broadcast.emit("updateRoomGroup", {
        data: rows,
        userId: userId,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      console.log(err.message, "updateRoomGroup with error");
      // socket.broadcast.emit("updateRoomGroup", {
      //   data: null,
      //   userId: null,
      //   isErr: true,
      //   errMess: err.message,
      // });
    }
  });

  // if (req.session.userId) {
  //   // to do something
  // }

  socket.on("disconnect", () => {
    try {
      delete socketDB[String(req.session.userId)];
      delete socketDB[socket.id];
    } catch (err) {
      console.error(err);
    }
  });
});

let p2 = path.join(__dirname, "../uploads");
app.use(express.static(p2));
let p = path.join(__dirname, "../public");
app.use(express.static(p));

let userController = new UserController();
let meetController = new MeetController();
let filterController = new FilterController();
let editProfileController = new EditProfileController();
let chatController = new ChatController();
app.use("/user", userController.routes);
app.use("/meet", meetController.routes);
app.use("/filter", filterController.routes);
app.use("/editProfile", editProfileController.routes);
app.use("/chat", chatController.routes);

app.get("/test", async (req: express.Request, res: express.Response) => {
  // const matchedUsers = (
  //     await knex.raw(
  //       `select user_message.group_id, users.user_icon, users.username, message.message, user_message.max
  //       from (select group_id, max(message.created_at)
  //       from message, "group"
  //       where group_id = "group".id
  //       and "group".matched_user_id1 = 89
  //       or "group".matched_user_id2 = 89
  //       group by group_id) as user_message, message, users
  //       where user_message.group_id = message.group_id
  //       and user_message.max = message.created_at
  //       and users.id = message.user_id
  //       order by user_message.max desc`
  //     )
  //   ).rows;
  // const lastMessage = await knex("message")
  //   .join(
  //     function () {
  //       this.join("group", "group_id", "=", "group.id")
  //         .select("group_id")
  //         .from("message")
  //         .where("matched_user_id1", 90)
  //         .orWhere("matched_user_id2", 90)
  //         .max("message.created_at")
  //         .groupBy("group_id")
  //         .as("user_message");
  //     },
  //     "user_message.max",
  //     "=",
  //     "message.created_at"
  //   )
  //   .join("group", "group.id", "=", "message.group_id")
  //   .join("users", function () {
  //     this.on("users.id", "=", "matched_user_id1");
  //     // .orOn("users.id","=","matched_user_id2")
  //   })
  //   .join("users AS u2", function () {
  //     this.on("u2.id", "=", "matched_user_id2");
  //     // .orOn("users.id","=","matched_user_id2")
  //   })
  //   .select(
  //     "user_message.group_id",
  //     "message.message",
  //     "user_message.max",
  //     "matched_user_id1",
  //     "matched_user_id2",
  //     "users.username",
  //     "u2.username AS username2",
  //     "users.user_icon",
  //     "u2.user_icon AS user_icon2"
  //   )
  //   // .where("user_message.group_id","message.group_id")
  //   .orderBy("user_message.max", "desc");
  // const matchedUsers = await knex("message")
  //     .join("users","users.id","=","message.user_id")
  //     .join("group","group.id","=","message.group_id")
  //     .select("users.username","users.user_icon","message.group_id")
  // .whereNot("group.matched_user_id1",89)
  // .orWhereNot("group.matched_user_id2",89)
  // .whereIn("message.group_id",function(){
  //     this
  //     .join("group","group_id","=","group.id")
  //     .select("group_id")
  //     .from("message")
  //     .where("matched_user_id1",89)
  //     .orWhere("matched_user_id1",89)
  //     .max("message.created_at")
  //     .groupBy("group_id")
  //     .as("user_message")
  // })
  // const lastMessageTime = await knex
  //       .join("message","message.group_id","=","group.id")
  //       .select("group.id")
  //       .from("group")
  //       .where("matched_user_id1",89)
  //       .orWhere("matched_user_id1",89)
  //       .max("message.created_at")
  //       .groupBy("message.group_id")
  // .as("user_message")
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
  //   const subquery = await knex ("message")
  //   .join("group","group_id","=","group.id")
  //   .select("group_id")
  //   .where("matched_user_id1",89)
  //   .orWhere("matched_user_id1",89)
  //   .max("message.created_at")
  //   .groupBy("group_id")
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
  // const matchedUsers = (
  //   await knex.raw(
  //     `select user_message.group_id, users.user_icon, users.username, message.message, user_message.max from (select group_id, max(message.created_at) from message, "group" where group_id = "group".id and "group".matched_user_id1 = 89 or "group".matched_user_id2 = 89 group by group_id) as user_message, message, users where user_message.group_id = message.group_id and user_message.max = message.created_at and users.id = message.user_id order by user_message.max desc`
  //   )
  // ).rows;
  // res.json(lastMessage);
  //   res.json(matchedUsers);
});

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});

server.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
