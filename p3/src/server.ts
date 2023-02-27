import express from "express";
import { UserController } from "./controller/userController";
import { FilterController } from "./controller/filterController";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";
import path from "path";
import { MeetController } from "./controller/meetController";
// import SocketIO from "socket.io";
import http from "http";
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

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});

server.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
