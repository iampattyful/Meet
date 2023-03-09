import expressSession from "express-session";
export let sessionMiddleware = expressSession({
  secret: "mySecret",
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    userId?: number;
    isLogin?: boolean;
    socketId?: string;
  }
}
