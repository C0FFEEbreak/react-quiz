import React, { useState, useEffect } from "react";
import "./App.css";

const myQuestArr = [
  {
    myQuestKey:
      "Which activity best describes training specifically for a half-marathon?",
    myOptKey: [
      "Biking up a mountain trail",
      "Hiking with a weighted backpack",
      "Running 13.1 miles at race pace",
      "Swimming 10 laps per day",
    ],
    myAnsKey: "Running 13.1 miles at race pace",
  },
  {
    myQuestKey:
      "Which activity associates with long-distance road endurance events?",
    myOptKey: [
      "Biking 100 miles on paved roads",
      "Day hiking with trekking poles",
      "Trail running through a forest",
      "Swimming laps in a pool",
    ],
    myAnsKey: "Biking 100 miles on paved roads",
  },
  {
    myQuestKey: "Which activity involves elevation gain and trail navigation?",
    myOptKey: [
      "Road cycling on flat terrain",
      "Hiking on a mountain trail",
      "Sprint running on a track",
      "Indoor lap swimming",
    ],
    myAnsKey: "Hiking on a mountain trail",
  },
];

const myIconArr = [
  <i className="fa-solid fa-person-biking"></i>,
  <i className="fa-solid fa-person-hiking"></i>,
  <i className="fa-solid fa-person-running"></i>,
  <i className="fa-solid fa-person-swimming"></i>,
];

export default function QuizApp() {
  const [myQuestVar, myQuestFunc] = useState(0);
  const [myScoreVar, myScoreFunc] = useState(0);
  const [myShowScoreVar, myShowScoreFunc] = useState(false);
  const [mySubmitted, mySetSubmitted] = useState(false);
  const [mySelectedOpt, mySetSelectedOpt] = useState(null);

  const myAnswerClick = (myOption) => {
    mySetSelectedOpt(myOption);
    if (myOption === myQuestArr[myQuestVar].myAnsKey) {
      myScoreFunc((myPrevScore) => myPrevScore + 1);
    }
    mySetSubmitted(true);
  };

  const myNextClick = () => {
    const myNextQuest = myQuestVar + 1;
    if (myNextQuest < myQuestArr.length) {
      myQuestFunc(myNextQuest);
      mySetSubmitted(false);
      mySetSelectedOpt(null);
    } else {
      myShowScoreFunc(true);
    }
  };

  useEffect(() => {
    if (myShowScoreVar) {
      document.querySelector(".results-screen h2")?.focus();
    }
  }, [myShowScoreVar]);

  return (
    <main className="quiz-container" role="main">
      <h1 className="sr-only">Activity Quiz</h1>

      <div
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
      >
        {myShowScoreVar
          ? `Quiz completed. You scored ${myScoreVar} out of ${myQuestArr.length}.`
          : ""}
      </div>

      {myShowScoreVar ? (
        <div className="results-screen">
          <h2 tabIndex="-1">Quiz Completed</h2>
          <p className="question-text">
            You scored {myScoreVar} out of {myQuestArr.length}
          </p>
          <button
            className="action-button"
            aria-label="Restart the quiz"
            onClick={(event) => {
              event.currentTarget.blur();
              myQuestFunc(0);
              myScoreFunc(0);
              myShowScoreFunc(false);
              mySetSubmitted(false);
              mySetSelectedOpt(null);
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="question-card">
          <h2 className="question-text" aria-live="polite">
            {myQuestArr[myQuestVar].myQuestKey}
          </h2>
          <div role="radiogroup" aria-label="Answer options">
            {myQuestArr[myQuestVar].myOptKey.map((myOption, myIndex) => {
              const isCorrect = myOption === myQuestArr[myQuestVar].myAnsKey;
              const isSelected = myOption === mySelectedOpt;
              const isWrong = mySubmitted && isSelected && !isCorrect;

              return (
                <label
                  key={myOption}
                  className={`option-button ${isSelected ? "selected" : ""}`}
                  style={{
                    backgroundColor:
                      mySubmitted && isCorrect
                        ? "#4CAF50"
                        : mySubmitted && isSelected
                          ? "#F44336"
                          : "",
                  }}
                >
                  {/* Visually hidden but keyboard-accessible radio input */}
                  <input
                    type="radio"
                    name={`question-${myQuestVar}`}
                    value={myOption}
                    checked={isSelected}
                    onChange={() => myAnswerClick(myOption)}
                    className="sr-only"
                  />

                  <span className="button-icon" aria-hidden="true">
                    {myIconArr[myIndex]}
                  </span>

                  {myOption}

                  {mySubmitted && isCorrect && (
                    <span className="result-icon" aria-hidden="true">
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="result-icon" aria-hidden="true">
                      ✗
                    </span>
                  )}

                  {mySubmitted && isCorrect && (
                    <span className="sr-only"> (Correct Answer)</span>
                  )}
                  {isWrong && <span className="sr-only"> (Incorrect)</span>}
                </label>
              );
            })}
          </div>

          <div className="feedback-row" aria-live="assertive">
            {mySubmitted && (
              <p className="feedback-text">
                {mySelectedOpt === myQuestArr[myQuestVar].myAnsKey
                  ? "That's correct. Great job!"
                  : `Incorrect. The correct answer is: ${myQuestArr[myQuestVar].myAnsKey}`}
              </p>
            )}
          </div>

          <div className="bottom-nav-container">
            <div className="progress-footer">
              Question {myQuestVar + 1} of {myQuestArr.length}
            </div>

            <button
              className="action-button"
              onClick={myNextClick}
              disabled={!mySubmitted}
              aria-label="Go to next question"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
