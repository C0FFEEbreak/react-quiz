import React, { useState } from "react";
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
  //1. NEXT BUTTON
  const [mySubmitted, mySetSubmitted] = useState(false);
  const [mySelectedOpt, mySetSelectedOpt] = useState(null);

  // 2. NEXT BUTTON
  const myAnswerClick = (myOption) => {
    mySetSelectedOpt(myOption);
    if (myOption === myQuestArr[myQuestVar].myAnsKey) {
      myScoreFunc((myPrevScore) => myPrevScore + 1);
    }
    mySetSubmitted(true);
  };

  // 3. NEXT BUTTON
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

return (
  <main className="quiz-container" role="main">
    {myShowScoreVar ? (
      <div className="results-screen" role="alert">
        <h2>Quiz Completed</h2>
        <p className="question-text">
          You scored {myScoreVar} out of {myQuestArr.length}
        </p>
        <button
          className="action-button"
          aria-label="Restart the quiz"
          onClick={() => {
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
        {/* aria-live ensures the screen reader reads new questions immediately */}
        <h2 className="question-text" aria-live="polite">
          {myQuestArr[myQuestVar].myQuestKey}
        </h2>
        
        <div className="options-list" role="radiogroup" aria-label="Answer options">
          {myQuestArr[myQuestVar].myOptKey.map((myOption, myIndex) => (
            <button
              key={myOption}
              className="option-button"
              onClick={() => myAnswerClick(myOption)}
              disabled={mySubmitted}
              /* aria-pressed helps screen readers know if this was the chosen one */
              aria-pressed={mySelectedOpt === myOption}
              style={{
                backgroundColor:
                  mySubmitted && myOption === myQuestArr[myQuestVar].myAnsKey
                    ? "#4CAF50"
                    : mySubmitted && myOption === mySelectedOpt
                      ? "#F44336"
                      : "",
              }}
            >
              {/* aria-hidden hides the icon from screen readers to prevent clutter */}
              <span className="button-icon" aria-hidden="true">{myIconArr[myIndex]}</span>
              {myOption}
              {/* Visually hidden text for screen readers only */}
              {mySubmitted && myOption === myQuestArr[myQuestVar].myAnsKey && (
                <span className="sr-only"> (Correct Answer)</span>
              )}
            </button>
          ))}
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
