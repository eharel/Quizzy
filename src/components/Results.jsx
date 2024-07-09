import { ActionTypes } from "../constants/action_types";

function Results({ points, totalPoints, highscore, dispatch }) {
  const percent = ((100 * points) / totalPoints).toFixed(1);

  let emoji;

  if (percent === 100) emoji = "🥇";
  if (percent >= 80 && percent < 100) emoji = "🥈";
  if (percent >= 60 && percent < 80) emoji = "🥉";
  if (percent >= 40 && percent < 60) emoji = "🤨";
  if (percent >= 0 && percent < 40) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>
          {emoji} You scored <strong>{points}</strong> out of {totalPoints}{" "}
          points ({percent}%)
        </span>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn"
        onClick={() => dispatch({ type: ActionTypes.START_QUIZ })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Results;
