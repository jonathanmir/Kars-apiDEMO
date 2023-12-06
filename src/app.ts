import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { announcementsRoutes } from "./routes/announcements.routes";
import { userRoutes } from "./routes/users.routes";
import { loginRouter } from "./routes/login.routes";
import recoverRouter from "./routes/forgotPassword.routes";
import resetPassowordRouter from "./routes/resetPassword.routes";
import { commentRoutes } from './routes/comments.routes';

const app: Application = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/announcements", announcementsRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRouter);
app.use("/recovery", recoverRouter);
app.use("/reset", resetPassowordRouter);
app.use("/comments", commentRoutes);
app.use(handleErrors);
export default app;
