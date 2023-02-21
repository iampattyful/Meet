import { env_config } from "./env";
import express from "express";
import path from "path";

import {
  del_onlineUsers,
  formidable_promise,
  get_onlineUsers,
} from "./helper/helper";

import { createServer } from "http";
import { Server } from "socket.io";

import { UserController } from "./controller/userController";
import { MemoController } from "./controller/memoController";
import knex from "knex";
import { sessionMiddleware } from "./session";

// import socketIO from 'socket.io'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

io.use((socket, next) => {
  let req = socket.request as express.Request;
  let res = req.res as express.Response;
  sessionMiddleware(req, res, next as express.NextFunction);
});

io.on("connection", async (socket) => {
  let req = socket.request as express.Request;

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
  socket.on("join_room", async (data) => {
    if (req.session.isLogin) {
      // await db.query(`UPDATE users SET room=$1 WHERE id=$2`,[
      //   data.room,req.session.userId
      // ])
      await knex("users")
        .update({ room: data.room })
        .where("id", req.session.userId);
      socket.join(`${data.room}`);
    }
  });

  socket.on("login", () => {
    io.emit("onlineUser", get_onlineUsers());
  });

  socket.on("logout", () => {
    io.emit("onlineUser", get_onlineUsers());
  });

  socket.on("add-memo", (data) => {
    socket.broadcast.to("a").emit("new_memo", data);
  });

  if (req.session.userId) {
    // let res = await db.query(`SELECT room FROM users WHERE id = $1`,[req.session.userId])
    // if(res.rows.length > 0){
    //   let room = res.rows[0].room
    //   console.log('rejoin',room)
    //   socket.join(`${room}`)
    // }
  }

  socket.on("disconnect", () => {
    if (req.session.userId) {
      del_onlineUsers(req.session.userId);
    }
  });
});

let p2 = path.join(__dirname, "../uploads");
// console.log(p2)
app.use(express.static(p2));
let p = path.join(__dirname, "../public");
app.use(express.static(p));

app.post("/test_form", async (req: express.Request, res: express.Response) => {
  let obj: any = await formidable_promise(req);

  console.log(obj);
});

const userController = new UserController();
app.use("/user", userController.routes);

const memoController = new MemoController();
app.use("/memo", memoController.routes);

// app.get('/', async (req:express.Request, res:express.Response)=>{
//     res.sendFile(path.join(p,'not use index.html'))
// })

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});
httpServer.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
