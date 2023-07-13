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
      <div className="unknownWrapper gap">
        {/* 
		
			Bewertung Google
		
		*/}
        <svg height="0" width="0">
          <defs>
            <clipPath id="unknown_border">
              <path
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.5794"
                strokeMiterlimit="10"
                d="M455.35,25.79l.37,149.91,15.17,13.03v61.13s-15.17,12.64-15.17,12.64v28.29h-123.08s-16.53-12.62-16.53-12.62h-90.46s-16.41,12.62-16.41,12.62h-80.55s-16.72,12.67-16.72,12.67H53.96s-16.66-12.67-16.66-12.67l-19.99,.11-.06-25.74L.5,252.27v-62.17l16.74-13.09,.06-163.92,170.85,.06L203.33,.5h67.91s15.17,12.64,15.17,12.64l152.9-.06,16.05,12.7Z"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="feedbackContainer pannel_text">
          <img src="img/feedback/ef_feedback.png" />
          <div className="efFeedbackText">
            <h2 className="efFeedbackTextHelp">Hilf uns, besser zu werden und sicher dir deinen Bootcamp Rabatt.</h2>
          </div>
        </div>
      </div>
    );
  }
}
