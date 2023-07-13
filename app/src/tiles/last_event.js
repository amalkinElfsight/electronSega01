import React from "react";
import { ElfsightWidget } from 'react-elfsight-widget';

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      ping: 0,
      checkTime: "",
    };
  }

  componentDidMount() {
    this.getRandom();
    this.intervalId = setInterval(this.getRandom.bind(this), 12000);
  }

  getRandom = () => {
    this.setState({
      ping: Math.floor(Math.random() * 3) + 6,
    });
    this.setState({
      checkTime: new Date().toLocaleTimeString("de", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Europe/Berlin",
      }),
    });
  };

  render() {
    return (
      <div className="lastEventWrapper gap">
        <ElfsightWidget widgetID="0b0b1a4b-cab5-4405-968d-1956d6ecc3f2" />
        <div className="lastEventBackground">
          <div className="pannel_text">
            <div className="pingTopLine">
              <p className="pingCheckTime">
                zuletzt geprüft: {this.state.checkTime}
              </p>
              <p className="pingServer">Server Standord: Frankfurt</p>
            </div>
            <div>
              <h1 className="pingNumber">Ping: {this.state.ping} ms </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
