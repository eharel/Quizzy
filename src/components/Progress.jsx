function Progress({
  questionInd,
  numQuestions,
  points,
  totalPoints,
  answerInd,
}) {
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
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
