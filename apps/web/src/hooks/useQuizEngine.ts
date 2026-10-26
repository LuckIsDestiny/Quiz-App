import { useEffect, useState } from "react";
import type { Question } from "../types/quiz";
import { sampleQuestions } from "../data/questions";

export const useQuizEngine = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = () => {
      setQuestions(sampleQuestions);
    };
    fetchQuestions();
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalScore = answers.reduce((acc, x, id) => {
      acc += x === questions[id].correctAnswer ? 1 : 0;
      return acc;
    }, 0);
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setSelectedAnswerIndex(null);
    setIsSubmitted(false);
  };

  const handleQuestionChange = (nav: "next" | "previous") => {
    const newIndex = currentQuestionIndex + (nav === "next" ? +1 : -1);
    setCurrentQuestionIndex(newIndex);
    if (answers[newIndex] !== undefined) {
      setSelectedAnswerIndex(answers[newIndex]);
    } else {
      setSelectedAnswerIndex(null);
    }
  };

  const handleAnswerChange = (id: number) => {
    setSelectedAnswerIndex(id);
    setAnswers((prev) => {
      const newArray = [...prev];
      newArray[currentQuestionIndex] = id;
      return newArray;
    });
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswerIndex,
    answers,
    score,
    isSubmitted,

    currentQuestion: questions[currentQuestionIndex],
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,

    handleQuestionChange,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  };
};
