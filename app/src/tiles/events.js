import React from "react";

export default class events extends React.Component {
  constructor() {
    super();
    this.state = {
      text: [],
      date: [],
      time: [],
      randomNumber: "",
      maxNumber: "",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="eventsWrapper gap">
        <p className="heading">
          {this.state.text[this.state.randomNumber]}
          <br />
          <br />
          {this.state.date[this.state.randomNumber]}
          <br /> {this.state.time[this.state.randomNumber]}
        </p>
      </div>
    );
  }
}
