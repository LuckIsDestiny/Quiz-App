import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="home-page-layout">
      <div className="home-page-card">
        <h1>Quiz App</h1>
        <p>Test your knowledge and improve your score</p>
        <button type="button" onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>
      </div>
    </main>
  );
};
