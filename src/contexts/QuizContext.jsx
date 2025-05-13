import { createContext, useEffect, useReducer } from "react";
import { ActionTypes } from "../constants/action_types";
import { Status } from "../constants/enums";

import questionsReact from "../data/questions-react.json";

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
        questions: payload,
        numQuestions: payload.length,
        maxPossiblePoints: payload.reduce(
          (accumulator, currObj) => accumulator + currObj.points,
          0
        ),
      };
    case ActionTypes.DATA_FAILED:
      return { ...state, status: Status.ERROR };
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
    case ActionTypes.ADD_POINTS:
      return { ...state, points: state.points + payload };
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
  const {
    questions,
    status,
    index,
    points,
    answerInd,
    highscore,
    secondsRemaining,
    numQuestions,
    maxPossiblePoints,
  } = state;

  useEffect(function () {
    const data = questionsReact;
    console.log("data", data);
    dispatch({ type: ActionTypes.DATA_RECEIVED, payload: data });
  }, []);

  // useEffect(function () {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       dispatch({ type: ActionTypes.DATA_RECEIVED, payload: data })
  //     )
  //     .catch((err) => dispatch({ type: ActionTypes.DATA_FAILED }));
  // }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        points,
        answerInd,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
