import React from "react";

// import { LineChart, Line } from "recharts";
// const data = [
//   { name: "Page A", erzeugt: 1900, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 2500, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 1600, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 2000, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 1900, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 2500, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 2100, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 1700, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 2400, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 1900, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 2300, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 1700, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 1800, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 2000, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 2100, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 2200, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 1800, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 2500, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 2100, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 1950, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 2000, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 1900, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 2100, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 1800, verbraucht: 2100 },
//   { name: "Page A", erzeugt: 2400, verbraucht: 2400 },
//   { name: "Page A", erzeugt: 2500, verbraucht: 2300 },
//   { name: "Page A", erzeugt: 1900, verbraucht: 2200 },
//   { name: "Page A", erzeugt: 2100, verbraucht: 2100 },
// ];

// const renderLineChart = (
//   <LineChart width={400} height={187} data={data}>
//     <Line type="monotone" dataKey="erzeugt" stroke="#23c96a" />
//     <Line type="monotone" dataKey="verbraucht" stroke="#db8138" />
//   </LineChart>
// );

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      time: "",
      temperature: "",
      background: "",
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCurrentTime.bind(this), 600);
    this.intervalId = setInterval(this.getCurrentWeather.bind(this), 1800000);
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
    if (previousTime.substring(0, 2) !== this.state.time.substring(0, 2)) {
      this.getCurrentWeather();
    }
  };
  getCurrentWeather = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    fetch(
      "https://api.brightsky.dev/weather?lat=52.28&lon=8.04&date=" +
        year +
        "-" +
        month +
        "-" +
        day
    )
      .then((response) => response.json())
      .then((weather) => {
        let i = 0;
        for (i = 0; i < weather.weather.length; i++) {
          if (
            weather.weather[i].timestamp.substring(11, 13) ===
            this.state.time.substring(0, 2)
          ) {
            let describtion = weather.weather[i].icon;
            //*** Mögliche Icons: clear-night┃partly-cloudy-day┃partly-cloudy-night┃cloudy┃fog┃wind┃sleet┃snow┃hail┃ ***//
            //*** Verwendete Icons: clear-day, thunderstorm, rain  ***//
            this.setState({
              temperature: Math.round(weather.weather[i].temperature),
              background:
                describtion === "clear-day"
                  ? "sun"
                  : describtion === "thunderstorm"
                  ? "thunderstorm2"
                  : describtion === "rain"
                  ? "rain"
                  : describtion === "snow"
                  ? "snow"
                  : describtion === "fog"
                  ? "mist2"
                  : "clouds",
            });
          }
        }
      });
  };

  // getCurrentStatistics = () => {
  //   const url =
  //     "https://sheets.googleapis.com/v4/spreadsheets/1s679H2pSMN3iPlEHlM_svAGEt7ldbGJ2yLGJO-3DStA/values/Stromverbrauch/?alt=json&key=AIzaSyC98PjE4ZNtUopDdHXdeEhJv5Fv9e8FcY0";
  //   fetch(url)
  //     .then((response) => response.text())
  //     .then((text) => {
  //       var parse = JSON.parse(text);
  //       var teamNames = parse["values"];
  //     });
  // };
  // getHint = () => {};
  /*

https://www.scichart.com/example/javascript-chart/javascript-realtime-mountain-chart/

0 wert = average des averages (Average der beiden Werte berechnen und den dann zusammen rechnen)
punkt im chart -> wert - average





https://www.scichart.com/example/javascript-chart/javascript-spline-band-chart/

Werte können einfach so übernommen werden





*/
  render() {
    return (
      <div className="currentStatisticsWrapper gap">
        <div
          className="weatherBackground "
          style={{
            backgroundImage:
              "url(img/weather/" + this.state.background + ".jpg)",
          }}
        >
          <div className="weatherGradient">
            <div class="pannel_text ">
              <p className="text">{this.state.time}</p>
              <p className="text">{this.state.temperature}°C</p>
            </div>
          </div>
        </div>
        {/* {renderLineChart} */}
      </div>
    );
  }
}
