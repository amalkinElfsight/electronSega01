import React from "react";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      headline: "",
      gifsource: "",
      opacity: 0.3,
      showBirthday: true,
    };
  }

  componentDidMount() {
    this.getHint();
    this.intervalId = setInterval(this.getHint.bind(this), 120000);
  }

  getHint = () => {};

  render() {
    return (
      <div className="wlanWrapper gap">
        <div className="wlanBackgroundImage">
          <svg height="0" width="0">
            <defs>
              <clipPath id="wlan_border">
                <path
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5794"
                  strokeMiterlimit="10"
                  d="M293.56,12.41h59.7l13.45-11.91h69.44V111.04l-153.38,.28-11.77,12.89h-95.01l-16.56-13.18-142.69,.3L.5,95.7V.5H40.57l14.77,11.91H122.47L140.28,.5h141.61s11.67,11.91,11.67,11.91Z"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="wlanContainer">
            <h1>WLAN</h1>
            <img
              className="wlanCode"
              role="presentation"
              src="img/wlan/wlan.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
