import { createContext, useEffect, useReducer } from "react";
import { ActionTypes } from "../constants/action_types";
import { Status } from "../constants/enums";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answerInd: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
  maxPossiblePoints: 0,
  numQuestions: 0,
  subject: "react", // Default subject
};

/* -------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------- REDUCER
----------------------------------------------------------------------------------------
------------------------------------------------------------------------------------- */
function reducer(state, { type, payload }) {
  const { points, highscore, secondsRemaining, questions } = state;
  switch (type) {
    case ActionTypes.DATA_RECEIVED:
      return {
        ...state,
        status: Status.READY,
        questions: payload.questions,
        numQuestions: payload.questions.length,
        maxPossiblePoints: payload.questions.reduce(
          (accumulator, currObj) => accumulator + currObj.points,
          0
        ),
      };
    case ActionTypes.DATA_FAILED:
      return { ...state, status: Status.ERROR };
    case ActionTypes.CHANGE_SUBJECT:
      return { ...state, subject: payload, status: Status.LOADING };
    case ActionTypes.START_QUIZ:
      return {
        ...state,
        status: Status.ACTIVE,
        secondsRemaining: questions.length * SECONDS_PER_QUESTION,
        index: 0,
        answerInd: null,
        points: 0,
      };
    case ActionTypes.ANSWER:
      const currQuestion = state.questions[state.index];
      return {
        ...state,
        answerInd: payload,
        points:
          currQuestion.correctOption === payload
            ? points + currQuestion.points
            : points,
      };
    case ActionTypes.NEXT_QUESTION:
      if (state.index < state.questions.length - 1) {
        return { ...state, index: state.index + 1, answerInd: null };
      }
      break;
    case ActionTypes.FINISH:
      return {
        ...state,
        status: Status.FINISHED,
        highscore: Math.max(highscore, points),
      };
    case ActionTypes.TICK:
      return {
        ...state,
        secondsRemaining: secondsRemaining - 1,
        status: secondsRemaining - 1 <= 0 ? Status.FINISHED : state.status,
        highscore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highscore)
            : highscore,
      };
    default:
      throw new Error();
  }
}

/* -------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------- CONTEXT PROVIDER
----------------------------------------------------------------------------------------
------------------------------------------------------------------------------------- */
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { subject } = state;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await import(`../data/questions-${subject}.json`);
        dispatch({
          type: ActionTypes.DATA_RECEIVED,
          payload: { questions: response.default },
        });
      } catch (error) {
        dispatch({ type: ActionTypes.DATA_FAILED });
      }
    }
    fetchQuestions();
  }, [subject]);

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
