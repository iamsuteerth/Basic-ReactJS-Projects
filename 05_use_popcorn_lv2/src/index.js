import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import StarRating from "./StarRating";
// Considering a scenario where the state needs to be used 
function Test(){
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating}/>
      <p>This movie was rated {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating = {3}
    />
    <StarRating maxRating={10} color="#b30000" size={24}/> */}
    <App/>
  </React.StrictMode>
);
