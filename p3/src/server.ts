import express from "express";
import { UserController } from "./controller/userController";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";
import path from "path";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

let p2 = path.join(__dirname, "../uploads");
// console.log(p2)
app.use(express.static(p2));
let p = path.join(__dirname, "../public");
app.use(express.static(p));

let userController = new UserController();
app.use("/user", userController.routes);
// app.get("/test", async (req: express.Request, res: express.Response) => {
//   res.json("s");
// });

// app.use("/filter/:id", filterController.routes)

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, "error.html"));
});

app.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
