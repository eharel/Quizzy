import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { Status } from "../constants/enums";
import Progress from "./Progress";
import Results from "./Results";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";
import { useQuiz } from "../hooks/useContext";

/* -------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
-------------------------------------------------------------------------- APP COMPONENT
----------------------------------------------------------------------------------------
------------------------------------------------------------------------------------- */
export default function Quiz() {
  const { status, index } = useQuiz();

  /* -------------------------------------------------------------------------------------
  ---------------------------------------------------------------------------- MAIN RETURN
  ------------------------------------------------------------------------------------- */
  return (
    <div className="app">
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <Error />}
        {status === Status.READY && <StartScreen />}
        {status === Status.ACTIVE && <Progress />}
        {status === Status.ACTIVE && index >= 0 && (
          <>
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && <Results />}
      </Main>
    </div>
  );
}
