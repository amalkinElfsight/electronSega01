import React, { Component } from "react";

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
      <div className="mapWrapper gap">
        {/* 
		
			Bewertung eigenes Formular
		
		*/}
        <svg height="0" width="0">
          <defs>
            <clipPath id="map_border">
              <path
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.5794"
                strokeMiterlimit="10"
                d="M420.4,117.52l15.83,12.49,.75,116.81-14.88,13.07h-153.67s-15.57-13.07-15.57-13.07h-67.91s-16.49,13.07-16.49,13.07H.5v-38.26s17.66-12.17,17.66-12.17v-47.59S.5,149.76,.5,149.76V13.84s99.26-.69,99.26-.69L114.93,.5h88.81s15.17,12.64,15.17,12.64l216.97,.69,.35,65.12-15.83,12.53v26.03Z"
              />
            </clipPath>
          </defs>
        </svg>

        <div className="feedbackContainer pannel_text">
          <h2 className="feedbackText">Sag auch anderen, wie du es hier findest:</h2>
          <img src="img/feedback/google_qr_code.png" />
        </div>
      </div>
    );
  }
}
