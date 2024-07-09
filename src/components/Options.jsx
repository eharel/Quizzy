import { useState } from "react";
import { ActionTypes } from "../constants/action_types";

function Options({ options, correctOption, dispatch }) {
  const [userChoice, setUserChoice] = useState(-1);
  const [answeredOnce, setAnsweredOnce] = useState(false);

  function handleClick(ind) {
    setUserChoice(ind);
    if (!answeredOnce) dispatch({ type: ActionTypes.ANSWER, payload: ind });
    setAnsweredOnce(true);
  }

  return (
    <div className="options">
      {options.map((option, ind) => (
        <button
          className={`btn btn-option 
            ${userChoice > -1 && ind === correctOption ? "correct" : ""}
            ${userChoice === ind && "answer"}
            ${userChoice === ind && ind !== correctOption ? "wrong" : ""}
            `}
          disabled={userChoice >= 0}
          key={option}
          onClick={() => handleClick(ind)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
