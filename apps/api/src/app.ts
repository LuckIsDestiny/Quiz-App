import express, { type Express } from "express";
import authRouter from "./modules/auth/auth.routes.js";
// import quizRouter from "./modules/quiz/quiz.routes.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
// app.use("/api/quizzes", quizRouter);

app.use(errorHandler);

export default app;
