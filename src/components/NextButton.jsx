import { ActionTypes } from "../constants/action_types";
import { useQuiz } from "../hooks/useContext";

function NextButton() {
  const { dispatch, index, answerInd, numQuestions } = useQuiz();
  const isLastQuestion = index === numQuestions - 1;

  function handleClick() {
    if (isLastQuestion) {
      dispatch({ type: ActionTypes.FINISH });
    } else {
      dispatch({ type: ActionTypes.NEXT_QUESTION });
    }
  }
  console.log(answerInd);
  return (
    <>
      {answerInd !== null && (
        <button className="btn btn-ui" onClick={handleClick}>
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
}

export default NextButton;
