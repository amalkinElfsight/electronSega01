import React from "react";

export default class welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      time: "",
      background: "",
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCurrentTime.bind(this), 600);
  }

  getCurrentTime = () => {
    let previousTime = this.state.time;
    this.setState({
      time: new Date().toLocaleTimeString("de", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        timeZone: "Europe/Berlin",
      }),
    });
  };

  render() {
    return (
      <div className="welcomeWrapper gap">
        <div className="welcomeBackground welcomeWrapper">
          <div class="pannel_text welcome">
            <div className="">
              <h1 className="headingHero">Welcome to the</h1>
              <h2 className="headingHeroThin">Esport Factory</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
