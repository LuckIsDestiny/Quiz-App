import { z } from "zod";

export const questionSchema = z.object({
  text: z.string().trim().min(2).max(100),
  options: z.string().trim().min(2).max(50).array(),
  correctAnswer: z.number().min(0),
});

export const createQuizSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(50).optional(),
  questions: questionSchema.array().optional(),
});
