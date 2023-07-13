import React from "react";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      teamNumber: 0,
      team: [
        {
          game: "",
          quote: "",
          players: [],
        },
      ],
    };
  }

  componentDidMount() {
    this.getTeams();
    setTimeout(() => {
      this.showTeams();
    }, 5000);
    this.intervalId = setInterval(this.showTeams.bind(this), 35000);
  }
  showTeams = () => {
    setTimeout(() => {
      if (this.state.teamNumber < this.state.team.length - 1) {
        this.setState({ teamNumber: this.state.teamNumber + 1 });
      } else {
        this.setState({ teamNumber: 1 });
      }
    }, 250);
  };

  getTeams = () => {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1G7MMm022fUpbs-xMPjEUPekOkYPIPooJbDbo4YgsK0c/values/Teams/?alt=json&key=AIzaSyC98PjE4ZNtUopDdHXdeEhJv5Fv9e8FcY0";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        var parse = JSON.parse(text);

        var teamNames = parse["values"];

        teamNames.forEach((element) => {
          var game;
          game = element.toString();

          var link =
            "https://sheets.googleapis.com/v4/spreadsheets/1G7MMm022fUpbs-xMPjEUPekOkYPIPooJbDbo4YgsK0c/values/" +
            element +
            "/?alt=json&key=AIzaSyC98PjE4ZNtUopDdHXdeEhJv5Fv9e8FcY0";
          fetch(link)
            .then((response) => response.text())
            .then((text) => {
              var parse = JSON.parse(text);

              var teamInfo = parse["values"];

              let tempInfo = teamInfo.toString().split(",");

              var playerList = [];
              var int = 0;

              while (int < tempInfo.length - 2) {
                playerList.push(tempInfo[int + 2].toString());
                int++;
              }

              this.setState({
                team: [
                  ...this.state.team,
                  {
                    game: JSON.stringify(tempInfo[0]).slice(1, -1),
                    quote: JSON.stringify(tempInfo[1]).slice(1, -1),
                    players: JSON.stringify(playerList)
                      .slice(2, -2)
                      .replaceAll('","', " "),
                  },
                ],
              });
            });
        });
      });
  };

  getHint = () => {};

  render() {
    return (
      <div className="teamstWrapper gap">
        <div
          className="teamsBackground"
          style={{
            backgroundImage:
              "url(img/teams/" +
              this.state.team[this.state.teamNumber].game +
              "Team.jpg)",
          }}
        >
          <div className="teamsGradient">
            <div class="pannel_text teams">
              <img
                class="teams_game_img"
                src={
                  "img/teams/" +
                  this.state.team[this.state.teamNumber].game +
                  ".png"
                }
                alt="Game"
              ></img>
              <h1 className="team_quote">
                {this.state.team[this.state.teamNumber].quote}
              </h1>
              <h2 className="players">
                {this.state.team[this.state.teamNumber].players}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
