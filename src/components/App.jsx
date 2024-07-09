import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { Status } from "../constants/enums";
import { ActionTypes } from "../constants/action_types";
import Progress from "./Progress";
import Results from "./Results";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answerInd: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state, { type, payload }) {
  const { points, highscore, secondsRemaining, questions } = state;
  switch (type) {
    case ActionTypes.DATA_RECEIVED:
      return {
        ...state,
        status: Status.READY,
        questions: payload,
      };
    case ActionTypes.DATA_FAILED:
      return { ...state, status: Status.ERROR };
    case ActionTypes.START_QUIZ:
      return {
        ...initialState,
        status: Status.ACTIVE,
        highscore: highscore,
        questions: questions,
        secondsRemaining: questions.length * SECONDS_PER_QUESTION,
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

/* ------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------- APP
------------------------------------------------------------------------------------------------ */
export default function App() {
  const [
    {
      questions,
      status,
      index,
      points,
      answerInd,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [totalPoints, setTotalPoints] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);

  useEffect(
    function () {
      setTotalPoints(
        questions.reduce(
          (accumulator, currObj) => accumulator + currObj.points,
          0
        )
      );

      setNumQuestions(questions.length);
    },
    [questions]
  );

  useEffect(
    function () {
      if (status === Status.ACTIVE) {
      }
    },
    [status]
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: ActionTypes.DATA_RECEIVED, payload: data })
      )
      .catch((err) => dispatch({ type: ActionTypes.DATA_FAILED }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <Error />}
        {status === Status.READY && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === Status.ACTIVE && (
          <Progress
            questionInd={index}
            numQuestions={numQuestions}
            points={points}
            totalPoints={totalPoints}
            answerInd={answerInd}
          />
        )}
        {status === Status.ACTIVE && index >= 0 && (
          <>
            <Question
              questionObj={questions[index]}
              questionInd={index}
              numQuestions={numQuestions}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answerInd={answerInd}
                isLastQuestion={index === numQuestions - 1}
              />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && (
          <Results
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
