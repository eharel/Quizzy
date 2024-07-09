import { useEffect } from "react";
import { ActionTypes } from "../constants/action_types";

function Timer({ dispatch, secondsRemaining }) {
  const minute = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: ActionTypes.TICK });
      }, 1000);

      return function () {
        clearInterval(intervalId);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
