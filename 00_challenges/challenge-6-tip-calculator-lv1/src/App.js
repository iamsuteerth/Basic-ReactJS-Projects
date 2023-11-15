import { useState } from "react";
import "./styles.css";

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [perc1, setPerc1] = useState(0);
  const [perc2, setPerc2] = useState(0);

  function reset() {
    setBill("");
    setPerc1(0);
    setPerc2(0);
  }

  const tip = bill * ((perc1 + perc2) / 2 / 100);
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={perc1} onSelect={setPerc1}>
        How did you like the service? (Host 1){" "}
      </SelectPercentage>
      <SelectPercentage percentage={perc2} onSelect={setPerc2}>
        How did you like the service? (Host 2){" "}
      </SelectPercentage>
      {bill > 0 && (
        <>
          <BillOutput bill={bill} tip={tip} />
          <Reset onReset={reset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function BillOutput({ bill, tip }) {
  return (
    <h3>
      You pay {bill + +tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Fantastic (20%)</option>
      </select>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}
