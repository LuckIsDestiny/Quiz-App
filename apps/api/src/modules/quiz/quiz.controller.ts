import type { Request, Response } from "express";
import * as quizService from "./quiz.service.js";
import type {
  CreateQuestionSchema,
  CreateQuizSchema,
  IdParamInputSchema,
  SubmitAttemptSchema,
  UpdateQuestionSchema,
  UpdateQuizSchema,
} from "./quiz.validation.js";
import { AppError } from "../../utils/AppError.js";
import { getAuthUser } from "../../utils/getAuthUser.js";

export const getQuizzes = async (_req: Request, res: Response) => {
  const quizzes = await quizService.getQuizzes();
  res.status(200).json({ success: true, data: quizzes });
};

export const getQuizById = async (req: Request, res: Response) => {
  const { quizId } = req.params as IdParamInputSchema;
  const quiz = await quizService.getQuizById(quizId);
  res.status(200).json({ success: true, data: quiz });
};

export const submitAttempt = async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { quizId } = req.params as IdParamInputSchema;
  const data: SubmitAttemptSchema = req.body;
  const attempt = await quizService.submitAttempt(user.id, quizId, data);
  res.status(201).json({ success: true, data: attempt });
};

export const getMyAttemptsForQuiz = async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { quizId } = req.params as IdParamInputSchema;
  const attempts = await quizService.getMyAttemptsForQuiz(user.id, quizId);
  res.status(200).json({ success: true, data: attempts });
};

export const getMyAttemptByIdForQuiz = async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { quizId, attemptId } = req.params as IdParamInputSchema;
  if (!attemptId) {
    throw new AppError("Attempt ID is required", 400);
  }
  const attempt = await quizService.getMyAttemptByIdForQuiz(
    user.id,
    quizId,
    attemptId,
  );
  res.status(200).json({ success: true, data: attempt });
};

export const createQuiz = async (req: Request, res: Response) => {
  const data: CreateQuizSchema = req.body;
  const quiz = await quizService.createQuiz(data);
  res.status(201).json({ success: true, data: quiz });
};

export const updateQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params as IdParamInputSchema;
  const data: UpdateQuizSchema = req.body;
  const quiz = await quizService.updateQuiz(quizId, data);
  res.status(200).json({ success: true, data: quiz });
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params as IdParamInputSchema;
  const quiz = await quizService.deleteQuiz(quizId);
  res.status(200).json({ success: true, data: quiz });
};

export const addQuestionToQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params as IdParamInputSchema;
  const data: CreateQuestionSchema = req.body;
  const quiz = await quizService.addQuestionToQuiz(quizId, data);
  res.status(201).json({ success: true, data: quiz });
};

export const updateQuestionFromQuiz = async (req: Request, res: Response) => {
  const { quizId, questionId } = req.params as IdParamInputSchema;
  const data: UpdateQuestionSchema = req.body;
  if (!questionId) {
    throw new AppError("Question ID is required", 400);
  }
  const quiz = await quizService.updateQuestionFromQuiz(
    quizId,
    questionId,
    data,
  );
  res.status(200).json({ success: true, data: quiz });
};

export const deleteQuestionFromQuiz = async (req: Request, res: Response) => {
  const { quizId, questionId } = req.params as IdParamInputSchema;
  if (!questionId) {
    throw new AppError("Question ID is required", 400);
  }
  const quiz = await quizService.deleteQuestionFromQuiz(quizId, questionId);
  res.status(200).json({ success: true, data: quiz });
};
