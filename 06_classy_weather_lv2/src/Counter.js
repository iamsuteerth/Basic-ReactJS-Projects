import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  handleDecrement() {
    // this here is undefined because upon call, a copy is called
    this.setState((currentState) => {
      return { count: currentState.count - 1 };
    });
  }
  handleIncrement() {
    this.setState((currentState) => {
      return { count: currentState.count + 1 };
    });
  }
  render() {
    const date = new Date('June 21 2027');
    date.setDate(date.getDate() + this.state.count);
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>{date.toDateString()}</span>
        <span>[{this.state.count}]</span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
