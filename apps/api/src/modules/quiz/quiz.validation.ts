import { z } from "zod";

export const createQuestionSchema = z.object({
  text: z.string().trim().min(2).max(100),
  options: z.string().trim().min(2).max(50).array().min(2),
  correctAnswer: z.number().min(0),
});

export const updateQuestionSchema = createQuestionSchema.partial();

export const createQuizSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(50).optional(),
  questions: createQuestionSchema.array().optional(),
});

export const updateQuizSchema = createQuizSchema
  .partial()
  .omit({ questions: true });

export const submitAnswerSchema = z.object({
  questionId: z.uuid(),
  selectedIndex: z.number().min(0).optional(),
});

export const submitAttemptSchema = z.object({
  answers: submitAnswerSchema.array(),
});

export const idParamInputSchema = z.object({
  quizId: z.uuid(),
  questionId: z.uuid().optional(),
  attemptId: z.uuid().optional(),
});

export type IdParamInputSchema = z.infer<typeof idParamInputSchema>;
export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>;
export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
export type UpdateQuizSchema = z.infer<typeof updateQuizSchema>;
export type SubmitAnswerSchema = z.infer<typeof submitAnswerSchema>;
export type SubmitAttemptSchema = z.infer<typeof submitAttemptSchema>;
