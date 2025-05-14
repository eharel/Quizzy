import { QuizProvider } from "./contexts/QuizContext";
import SubjectSelector from "./components/SubjectSelector";
import Quiz from "./components/Quiz"; // Assuming you have a Quiz component
import Header from "./components/Header";

function App() {
  return (
    <QuizProvider>
      <div>
        <Header />
        <SubjectSelector />
        <Quiz />
      </div>
    </QuizProvider>
  );
}

export default App;
