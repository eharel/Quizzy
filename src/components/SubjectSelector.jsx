import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { ActionTypes } from "../constants/action_types";
import "./../styles/SubjectSelector.css"; // Import the CSS file

function SubjectSelector() {
  const { subject, dispatch } = useContext(QuizContext);

  const handleSubjectChange = (newSubject) => {
    dispatch({ type: ActionTypes.CHANGE_SUBJECT, payload: newSubject });
  };

  return (
    <div className="subject-selector">
      <h2>Select a Subject</h2>
      <div className="button-row">
        <button
          className="btn"
          onClick={() => handleSubjectChange("react")}
          disabled={subject === "react"}
        >
          React
        </button>
        <button
          className="btn"
          onClick={() => handleSubjectChange("javascript")}
          disabled={subject === "javascript"}
        >
          JavaScript
        </button>
        <button
          className="btn"
          onClick={() => handleSubjectChange("python")}
          disabled={subject === "python"}
        >
          Python
        </button>
        <button
          className="btn"
          onClick={() => handleSubjectChange("html")}
          disabled={subject === "html"}
        >
          HTML
        </button>
      </div>
    </div>
  );
}

export default SubjectSelector;
