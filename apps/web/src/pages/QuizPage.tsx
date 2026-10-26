import { useNavigate } from "react-router";
import { useQuizEngine } from "../hooks/useQuizEngine";
import { QuizResults } from "./QuizResults";

export const QuizPage = () => {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswerIndex,
    score,
    isSubmitted,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    handleQuestionChange,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  } = useQuizEngine();

  const navigate = useNavigate();

  return (
    <div className="quiz-layout">
      {questions.length > 0 &&
        (isSubmitted ? (
          <QuizResults handleReset={handleReset} score={score} />
        ) : (
          <div className="quiz-card">
            <div className="card-header">
              <h3>Question {currentQuestionIndex + 1}</h3>
              <button type="button" onClick={() => navigate("/")}>
                Exit Quiz
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <p>{currentQuestion.text}</p>
              <span>Options:</span>
              {currentQuestion.options.map((option, id) => (
                <div key={`option-${id}`} className="option-container">
                  <input
                    type="radio"
                    name="options"
                    id={`option-${id}`}
                    value={currentQuestion.options[id]}
                    onChange={() => handleAnswerChange(id)}
                    checked={selectedAnswerIndex === id}
                  />
                  <label htmlFor={`option-${id}`}>{option}</label>
                </div>
              ))}
              <div className="button-group">
                <button
                  type="button"
                  disabled={isFirstQuestion}
                  onClick={() => handleQuestionChange("previous")}
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={isLastQuestion}
                  onClick={() => handleQuestionChange("next")}
                >
                  Next
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        ))}
    </div>
  );
};
