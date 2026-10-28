import express, { type Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import {
  createQuestionSchema,
  createQuizSchema,
  submitAttemptSchema,
  updateQuizSchema,
} from "./quiz.validation.js";
// import * as quizController from "./quiz.controller.js";
import { authorize } from "../../middlewares/authorize.js";

const router: Router = express.Router();

// router.get("/", quizController.getQuizzes);
// router.get("/:id", quizController.getQuizById);

router.use(requireAuth);

router.post(
  "/:id/attempts",
  validate(submitAttemptSchema),
  authorize("USER", "ADMIN"),
  //   quizController.submitAttempt,
);

router.post(
  "/",
  validate(createQuizSchema),
  authorize("ADMIN"),
  //   quizController.createQuiz,
);

router.patch(
  "/:id",
  validate(updateQuizSchema),
  authorize("ADMIN"),
  //   quizController.updateQuiz,
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  //   quizController.deleteQuiz,
);

router.post(
  "/:id/questions",
  validate(createQuestionSchema),
  authorize("ADMIN"),
  //   quizController.addQuestionToQuiz,
);

export default router;
