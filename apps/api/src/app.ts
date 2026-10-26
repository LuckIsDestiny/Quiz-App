import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

// app.use("/api/auth", authRouter);
// app.use("/api/questions", questionRouter);
// app.use("/api/quizzes", quizRouter);

// app.use(errorHandler);

export default app;
