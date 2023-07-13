import React from "react";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      eventNumber: 0,
      transistionClass: "",
      event: [
        {
          headline: "DBD Anniversary LAN",
          first: "5 Tage LAN-Party",
          second: "über 280 Stunden Streamzeit",
          third: "9 Streamer:innen",
          date: "19.06.2023 - 23.06.2023",
        },
        {
          headline: "Streammerch Event",
          first: "Community Treffen",
          second: "",
          third: "80+ Streamer:innen in 2 Tagen",
          date: "28.07.2023 - 30.07.2023",
        }
      ]
    };
  }

  componentDidMount() {
    this.changeEvent();
    this.intervalId = setInterval(this.changeEvent.bind(this), 30000);
  }

  changeEvent = () => {
    this.setState({
      transistionClass: "sponsorLogoTransition ",
    });
    setTimeout(() => {
      if (this.state.eventNumber < 1) {
        this.setState({ eventNumber: this.state.eventNumber + 1 });
      } else {
        this.setState({ eventNumber: 0 });
      }
    }, 250);
    setTimeout(() => {
      this.setState({ transistionClass: " " });
    }, 500);
  };

  render() {
    return (
      <div className="nextEventWrapper gap">
        <div className="eventContent">
          <div className="eventInfoText">
            <h2 className="eventInfoTextTitle">
              {this.state.event[this.state.eventNumber].headline}
            </h2>
            <h4 className="eventInfoTextFirst">
              {this.state.event[this.state.eventNumber].first}
            </h4>
            <h4 className="eventInfoTextSecond">
              {this.state.event[this.state.eventNumber].second}
            </h4>
            <h4 className="eventInfoTextThird">
              {this.state.event[this.state.eventNumber].third}
            </h4>
          </div>
          <div className="eventInfo">
            <h4 className="eventInfoTitle">
              {this.state.event[this.state.eventNumber].date}
            </h4>
            <img
              className="eventPic"
              role="presentation"
              src={"img/nextEvent/" + this.state.eventNumber + ".png"}
            />
          </div>
        </div>
      </div>
    );
  }
}
