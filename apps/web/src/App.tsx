import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
};
