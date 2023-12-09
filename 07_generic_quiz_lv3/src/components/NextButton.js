import React from "react";

export default function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
  restart,
}) {
  if (restart) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    );
  }
  if (answer == null) return null;

  if (index && index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Next
      </button>
    );
  }
}
