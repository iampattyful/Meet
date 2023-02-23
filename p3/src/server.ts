import express from "express";
import { UserController } from "./controller/userController";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

let userController = new UserController();
app.use("/user", userController.routes);
// app.get("/test", async (req: express.Request, res: express.Response) => {
//   res.json("s");
// });

app.listen(env_config.PORT, () => {
  console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
