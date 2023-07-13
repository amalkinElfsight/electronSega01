import React from "react";

export default class carpool extends React.Component {
  constructor() {
    super();
    this.state = {
      followers_count: "",
    };
  }

  componentDidMount() {
    this.lookUp();
    this.intervalId = setInterval(this.lookUp.bind(this), 1800000);
  }

  lookUp = () => {
    fetch("https://api-v2.nextcounts.com/api/twitter/user/esportfactoryde")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          followers_count: data.followers,
        });
      });
  };
  render() {
    return (
      <div className="twitterWrapper gap">
        <div className="twitterBackgroundImage">
          <svg height="0" width="0">
            <defs>
              <clipPath id="twitter_border">
                <path
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5794"
                  strokeMiterlimit="10"
                  d="M18.46,.5H245.69l14.87,12.41h94.62s15.34-12.41,15.34-12.41h65.36V47.66l18.07,10.43v26.33l-18.07,13.04H.5L1.01,12.91,18.46,.5Z"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="twitterContainer">
            <img
              className="twitterLogo"
              role="presentation"
              src="img/twitter/twitter_logo.svg"
            />
            <h1>{this.state.followers_count}</h1>
            <img
              className="twitterCode"
              role="presentation"
              src="img/twitter/twitter_qr_code.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
