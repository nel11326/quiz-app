import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userName, setUserName] = useState("");

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const startQuizHandler = () => {
    if (userName.trim()) {
      setQuizStarted(true);
      setUserAnswers([]);
    }
  };

  const resetQuizHandler = () => {
    setUserAnswers([]);
    setQuizStarted(false);
    setUserName("");
  };

  const selectAnswerHandler = useCallback(function selectAnswerHandler(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const skipAnswerHandler = useCallback(
    () => selectAnswerHandler(null),
    [selectAnswerHandler]
  );

  if (!quizStarted) {
    return (
      <div id="start-screen">
        <h2>Enter your name to start the quiz:</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Complete Name"
        />
        <button onClick={startQuizHandler}>Start Quiz</button>
      </div>
    );
  }

  if (quizIsComplete) {
    return (
      <Summary
        userAnswers={userAnswers}
        userName={userName}
        onResetQuiz={resetQuizHandler}
      />
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={selectAnswerHandler}
        onSkipAnswer={skipAnswerHandler}
      />
    </div>
  );
}
