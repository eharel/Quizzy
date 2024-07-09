import { useQuiz } from "../hooks/useContext";
import Options from "./Options";

function Question() {
  const { questions, index: questionInd, dispatch } = useQuiz();
  // const { question, options, correctOption } = questionObj;
  const { question, options, correctOption } = questions[questionInd];

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
