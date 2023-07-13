import React from "react";

export default class carpool extends React.Component {
  constructor() {
    super();
    // Token valid til end Juli
    this.state = {
      insta_id: "17841407781965023",
      instagram_access_token:
        "EABNai5Xbsu0BALii2csAyTHQ8ikE2IZCDo3GgcalZCOnldoET493TnPB0Y7UoDRjjliZAj9PPhzWmuCRRa3RkokTZB7ZAG456oMc1ui67af8ZCTemVWwAwTQtvV62Ywju6dVDSXVbYnRNMggZBRbIpgEdAWZBEtmGZAusbOJFb94gBD8PBUwnE81BsUiam9GFyZCEZD",
      instagram_follower: "",
    };
  }

  componentDidMount() {
    this.lookUp();
    this.intervalId = setInterval(this.lookUp.bind(this), 1800000);
  }

  lookUp = () => {
    fetch(
      "https://graph.facebook.com/v14.0/" +
        this.state.insta_id +
        "?fields=followers_count&access_token=" +
        this.state.instagram_access_token
    ).then((resp) =>
      resp.json().then((body) => {
        this.setState({
          instagram_follower: body.followers_count,
        });
      })
    );
  };

  render() {
    return (
      <div className="instaWrapper gap">
        <div className="instaBackgroundImage">
          <svg height="0" width="0">
            <defs>
              <clipPath id="insta_border">
                <path
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5794"
                  strokeMiterlimit="10"
                  d="M435.11,87.96l-171.36-1.13-18.22,12.89h-104.78s-16.94-12.89-16.94-12.89H.5s0-71.16,0-71.16v-2.28s212.15,0,212.15,0L226.16,.5h95.87s13.42,12.89,13.42,12.89h80.8s0,36.58,0,36.58l18.82,14.13,.03,23.86Z"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="instaContainer">
            <img
              className="insta_logo"
              role="presentation"
              src="img/insta/insta_logo.svg"
            />
            <h1>{this.state.instagram_follower}</h1>
            <img
              className="instaCode"
              role="presentation"
              src="img/insta/insta_qr_code.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
