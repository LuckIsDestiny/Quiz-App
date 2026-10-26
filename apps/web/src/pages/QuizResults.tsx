import { useNavigate } from "react-router";

type QuizResultsProps = {
  score: number;
  handleReset: () => void;
};

export const QuizResults = ({ score, handleReset }: QuizResultsProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="quiz-results">
        <h3>Quiz Submitted!!!</h3>
        <p>Score: {score}</p>
        <div className="button-group">
          <button type="button" onClick={handleReset}>
            Retake Quiz
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Exit Quiz
          </button>
        </div>
      </div>
    </>
  );
};
