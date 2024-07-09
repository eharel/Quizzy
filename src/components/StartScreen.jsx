import { ActionTypes } from "../constants/action_types";

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionTypes.START_QUIZ })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
