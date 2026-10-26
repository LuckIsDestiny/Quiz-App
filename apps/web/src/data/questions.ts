import type { Question } from "../types/quiz";

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Syntax",
      "Colorful Style Sheet",
    ],
    correctAnswer: 0,
  },
  {
    id: "q2",
    text: "Which of the following is a JavaScript library for building user interfaces?",
    options: ["Django", "React", "Flask", "Laravel"],
    correctAnswer: 1,
  },
  {
    id: "q3",
    text: "What is the output of `typeof null` in JavaScript?",
    options: ["null", "undefined", "object", "number"],
    correctAnswer: 2,
  },
];
