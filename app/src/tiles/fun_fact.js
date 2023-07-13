import React from "react";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      person: [
        {
          headline: "headline",
          fact1: "fact1",
          fact2: "fact2",
          fact3: "fact3",
          name: "name",
        },
      ],
      personNumber: 0,
    };
  }

  componentDidMount() {
    this.getFacts();

    setTimeout(() => {
      this.showFacts();
    }, 5000);
    this.intervalId = setInterval(this.showFacts.bind(this), 20000);
  }

  showFacts = () => {
    setTimeout(() => {
      if (this.state.personNumber < this.state.person.length - 1) {
        this.setState({ personNumber: this.state.personNumber + 1 });
      } else {
        this.setState({ personNumber: 1 });
      }
    }, 250);
  };
  
  getFacts = () => {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1VbXsx3TMvrrVmajP22fsg2WD7qbeD7X4u1yGEeQjdyo/values/Names/?alt=json&key=AIzaSyC98PjE4ZNtUopDdHXdeEhJv5Fv9e8FcY0";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        var parse = JSON.parse(text);

        var personNames = parse["values"];

        personNames.forEach((element) => {
          var personalName;
          personalName = element.toString();

          var link =
            "https://sheets.googleapis.com/v4/spreadsheets/1VbXsx3TMvrrVmajP22fsg2WD7qbeD7X4u1yGEeQjdyo/values/" +
            element +
            "/?alt=json&key=AIzaSyC98PjE4ZNtUopDdHXdeEhJv5Fv9e8FcY0";
          fetch(link)
            .then((response) => response.text())
            .then((text) => {
              var parse = JSON.parse(text);

              var teamInfo = parse["values"];

              let tempInfo = teamInfo.toString().split(",");

              this.setState({
                person: [
                  ...this.state.person,
                  {
                    headline: tempInfo[0],
                    fact1: tempInfo[1],
                    fact2: tempInfo[2],
                    fact3: tempInfo[3],
                    name: tempInfo[4],
                  },
                ],
              });
            });
        });
      });
  };

  render() {
    return (
      <div className="funFactWrapper gap">
        <div
          className="funFactBackground"
          style={{
            backgroundImage:
              "url(img/funfact/" +
              this.state.person[this.state.personNumber].name +
              ".jpg)",
          }}
        >
          <div className="funFactGradient">
            <div class="pannel_text funFact">
              <h2 className="funFactHeadline">
                {this.state.person[this.state.personNumber].headline}
              </h2>
              <h2 className="funFactFirst">
                {this.state.person[this.state.personNumber].fact1}
              </h2>
              <h2 className="funFactSecond">
                {this.state.person[this.state.personNumber].fact2}
              </h2>
              <h2 className="funFactThird">
                {this.state.person[this.state.personNumber].fact3}
              </h2>
              <h1 className="funFactName">
                {this.state.person[this.state.personNumber].name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
