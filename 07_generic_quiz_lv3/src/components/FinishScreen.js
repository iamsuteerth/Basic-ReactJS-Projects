import React from "react";

export default function FinishScreen({ points, maxPossiblePoints, highScore }) {
  const perc = (points / maxPossiblePoints) * 100;
  let emoji;
  if (perc === 100) emoji = "🥇";
  if (perc >= 80 && perc < 100) emoji = "🥳";
  if (perc >= 50 && perc < 80) emoji = "👍";
  if (perc < 50) emoji = "💩";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(perc)} %)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
    </>
  );
}
