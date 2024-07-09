import Options from "./Options";

function Question({ questionObj, questionInd, numQuestions, dispatch }) {
  const { question, options, correctOption } = questionObj;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
        dispatch={dispatch}
        key={question}
      />
    </div>
  );
}

export default Question;
