import React from "react";

export default class carpool extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.lookUp();
    this.intervalId = setInterval(this.lookUp.bind(this), 1800000);
  }

  lookUp = () => {};

  render() {
    return (
      <div className="feedbackWrapper gap">
        <div className="feedbackContainer pad">
          <h2>Sag auch anderen, wie du es hier findest:</h2>
        </div>
        <div className="feedbackContainer">
          <img src="img/feedback/google_qr_code.png" />
        </div>
      </div>
    );
  }
}
