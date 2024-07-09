import { useQuiz } from "../hooks/useContext";

function Progress() {
  const {
    index: questionInd,
    numQuestions,
    points,
    maxPossiblePoints,
    answerInd,
  } = useQuiz();

  // return <></>;
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={questionInd + Number(answerInd !== null)}
      />
      <p>
        Question <strong>{questionInd + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
