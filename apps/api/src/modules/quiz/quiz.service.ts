import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateQuizSchema, UpdateQuizSchema } from "./quiz.validation.js";

export const getQuizzes = async () => {
  return prisma.quiz.findMany();
};

export const getQuizById = async (id: string) => {
  return prisma.quiz.findUnique({ where: { id } });
};

export const createQuiz = async (data: CreateQuizSchema) => {
  return prisma.quiz.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      questions: { create: data.questions ?? [] },
    },
  });
};

export const updateQuiz = async (id: string, data: UpdateQuizSchema) => {
  const updatePayload: Prisma.QuizUpdateInput = {};
  if (data.title !== undefined) {
    updatePayload.title = data.title;
  }
  if (data.description !== undefined) {
    updatePayload.description = data.description ?? null;
  }
  return prisma.quiz.update({
    where: { id },
    data: updatePayload,
  });
};
