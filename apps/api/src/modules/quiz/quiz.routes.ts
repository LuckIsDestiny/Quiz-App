import express, { type Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import {
  createQuestionSchema,
  createQuizSchema,
  submitAttemptSchema,
  updateQuestionSchema,
  updateQuizSchema,
} from "./quiz.validation.js";
import * as quizController from "./quiz.controller.js";
import { authorize } from "../../middlewares/authorize.js";

const router: Router = express.Router();

router.get("/", quizController.getQuizzes);
router.get("/:quizId", quizController.getQuizById);

router.use(requireAuth);

router.post(
  "/:quizId/attempts",
  validate(submitAttemptSchema),
  authorize("USER", "ADMIN"),
  quizController.submitAttempt,
);

router.get(
  "/:quizId/attempts",
  authorize("USER", "ADMIN"),
  quizController.getMyAttemptsForQuiz,
);

router.get(
  "/:quizId/attempts/:attemptId",
  authorize("USER", "ADMIN"),
  quizController.getMyAttemptByIdForQuiz,
);

router.post(
  "/",
  validate(createQuizSchema),
  authorize("ADMIN"),
  quizController.createQuiz,
);

router.patch(
  "/:quizId",
  validate(updateQuizSchema),
  authorize("ADMIN"),
  quizController.updateQuiz,
);

router.delete("/:quizId", authorize("ADMIN"), quizController.deleteQuiz);

router.post(
  "/:quizId/questions",
  validate(createQuestionSchema),
  authorize("ADMIN"),
  quizController.addQuestionToQuiz,
);

router.patch(
  "/:quizId/questions/:questionId",
  validate(updateQuestionSchema),
  authorize("ADMIN"),
  quizController.updateQuestionFromQuiz,
);

router.delete(
  "/:quizId/questions/:questionId",
  authorize("ADMIN"),
  quizController.deleteQuestionFromQuiz,
);

export default router;
