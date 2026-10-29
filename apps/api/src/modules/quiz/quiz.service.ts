import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type {
  CreateQuestionSchema,
  CreateQuizSchema,
  SubmitAttemptSchema,
  UpdateQuestionSchema,
  UpdateQuizSchema,
} from "./quiz.validation.js";

export const getQuizzes = async () => {
  return prisma.quiz.findMany({
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });
};

export const getQuizById = async (quizId: string) => {
  return await prisma.quiz.findUniqueOrThrow({
    where: { id: quizId },
    include: {
      questions: {
        omit: {
          correctAnswer: true,
        },
      },
    },
  });
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

export const updateQuiz = async (quizId: string, data: UpdateQuizSchema) => {
  const updatePayload: Prisma.QuizUpdateInput = {};
  if (data.title !== undefined) {
    updatePayload.title = data.title;
  }
  if (data.description !== undefined) {
    updatePayload.description = data.description ?? null;
  }
  return prisma.quiz.update({
    where: { id: quizId },
    data: updatePayload,
  });
};

export const deleteQuiz = async (quizId: string) => {
  return prisma.quiz.delete({ where: { id: quizId } });
};

export const addQuestionToQuiz = async (
  quizId: string,
  data: CreateQuestionSchema,
) => {
  return prisma.question.create({
    data: {
      quizId,
      text: data.text,
      options: data.options,
      correctAnswer: data.correctAnswer,
    },
  });
};

export const updateQuestionFromQuiz = async (
  quizId: string,
  questionId: string,
  data: UpdateQuestionSchema,
) => {
  const updatePayload: Prisma.QuestionUpdateInput = {};
  if (data.text !== undefined) {
    updatePayload.text = data.text;
  }
  if (data.options !== undefined) {
    updatePayload.options = data.options;
  }
  if (data.correctAnswer !== undefined) {
    updatePayload.correctAnswer = data.correctAnswer;
  }
  return prisma.question.update({
    where: { id: questionId, quizId },
    data: updatePayload,
  });
};

export const deleteQuestionFromQuiz = async (
  quizId: string,
  questionId: string,
) => {
  return prisma.question.delete({
    where: { id: questionId, quizId },
  });
};

export const submitAttempt = async (
  userId: string,
  quizId: string,
  data: SubmitAttemptSchema,
) => {
  const quiz = await prisma.quiz.findUniqueOrThrow({
    where: { id: quizId },
    include: { questions: true },
  });

  const questionIdAnswer = new Map();
  for (let question of quiz.questions) {
    questionIdAnswer.set(question.id, question.correctAnswer);
  }

  const score = data.answers.reduce((score, answer) => {
    return questionIdAnswer.get(answer.questionId) === answer.selectedIndex
      ? score + 1
      : score;
  }, 0);

  return prisma.attempt.create({
    data: {
      userId,
      quizId,
      score,
      answers: {
        create: data.answers.map((answer) => ({
          selectedIndex: answer.selectedIndex ?? null,
          question: {
            connect: { id: answer.questionId },
          },
        })),
      },
    },
    include: { answers: true },
  });
};

export const getMyAttemptsForQuiz = async (userId: string, quizId: string) => {
  return prisma.attempt.findMany({
    where: { userId, quizId },
    include: { quiz: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const getMyAttemptByIdForQuiz = async (
  userId: string,
  quizId: string,
  attemptId: string,
) => {
  return prisma.attempt.findFirstOrThrow({
    where: { id: attemptId, userId, quizId },
    include: { answers: { include: { question: true } } },
  });
};
