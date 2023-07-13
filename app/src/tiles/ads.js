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
      <div className="adsWrapper gap">
        <svg height="0" width="0">
          <defs>
            <clipPath id="ads_border">
              <path
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.5794"
                strokeMiterlimit="10"
                d="M438.55,13.05v246.83s-56.44-.22-56.44-.22l-16.11-12.42h-95.87s-15.98,12.86-15.98,12.86l-235.94-.44L.5,247.23V109.32s16-12.74,16-12.74v-24.29S.5,59.64,.5,59.64V13.05H179.82S196.97,.5,196.97,.5h67.57s17.44,12.55,17.44,12.55h156.57"
              />
            </clipPath>
          </defs>
        </svg>
        <img src="img/ads/ad_1_nicedry.jpg" />
      </div>
    );
  }
}
