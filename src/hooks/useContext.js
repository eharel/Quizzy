import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("Questions context was used outside provider.");
  return context;
}
