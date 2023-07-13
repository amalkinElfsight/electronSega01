import React from "react";

export default class carpool extends React.Component {
  constructor() {
    super();
    // Token valid til end Juli
    this.state = {
      access_token: "t5oob528o7qzulwv2w8nmnuw514tu1",
      twitch_follower: "this.",
    };
  }

  componentDidMount() {
    this.lookUp();
    this.intervalId = setInterval(this.lookUp.bind(this), 1800000);
  }

  lookUp = () => {
    if (this.state.access_token === "") {
      fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: "lr2of2e5d2ao1aorl16da5ihvdcv1o",
          client_secret: "bnk8hutx5hsp9cpxyt9uuaxp4i9ke4",
          grant_type: "client_credentials",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            access_token: data.access_token,
          });
        });
    }

    fetch("https://api.twitch.tv/helix/users/follows?to_id=231887843", {
      headers: {
        Authorization: "Bearer " + this.state.access_token,
        "Client-Id": "lr2of2e5d2ao1aorl16da5ihvdcv1o",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          twitch_follower: data.total,
        });
      });
  };

  render() {
    return (
      <div className="twitchWrapper gap">
        <div className="twitchBackgroundImage">
          <svg height="0" width="0">
            <defs>
              <clipPath id="twitch_border">
                <path
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5794"
                  strokeMiterlimit="10"
                  d="M187.45,71.87l-17.95-12.73H101.28s-18.74,12.71-18.74,12.71H18.28v-7.94S.5,51.27,.5,51.27V24.51S18.28,12.04,18.28,12.04V.5H489.48s0,58.48,0,58.48l-15.1,12.64-286.93,.24Z"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="twitchContainer">
            <img
              className="twitch_logo"
              role="presentation"
              src="img/twitch/twitch_logo.png"
            />
            <h1>{this.state.twitch_follower}</h1>
            <img
              className="twitchCode"
              role="presentation"
              src="img/twitch/twitch_qr_code.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
