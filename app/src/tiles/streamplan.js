import React from "react";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      insta_id: "17841407781965023",
      instagram_access_token:
        "EABNai5Xbsu0BALii2csAyTHQ8ikE2IZCDo3GgcalZCOnldoET493TnPB0Y7UoDRjjliZAj9PPhzWmuCRRa3RkokTZB7ZAG456oMc1ui67af8ZCTemVWwAwTQtvV62Ywju6dVDSXVbYnRNMggZBRbIpgEdAWZBEtmGZAusbOJFb94gBD8PBUwnE81BsUiam9GFyZCEZD",
      media_ids: [],
      media_urls: [],
      caption: [],
      opacity: 0,
      backgroundImage: "",
      id: 0,
    };
  }

  componentDidMount() {
    this.getInstaImgs();
    this.intervalId = setInterval(this.getInstaImgs.bind(this), 8640000);
    this.intervalId = setInterval(this.setBackground.bind(this), 30000);
  }

  setBackground = () => {
    this.setState({
      opacity: 0,
      backgroundImage: this.state.media_urls[this.state.id],
    });
    if (this.state.id < 4) {
      this.setState({ id: this.state.id + 1 });
    } else {
      this.setState({ id: 0 });
    }
    this.setState({ opacity: 1 });
  };

  getInstaImgs = () => {
    fetch(
      "https://graph.facebook.com/v17.0/" +
        this.state.insta_id +
        "/media?fields=media_url,caption,media_type&access_token=" +
        this.state.instagram_access_token
    ).then((resp) =>
      resp.json().then((body) => {
        let i = 0;
        for (i = 0; i < 10; i++) {
          if (
            body.data[i].media_type == "CAROUSEL_ALBUM" ||
            body.data[i].media_type == "IMAGE"
          ) {
            this.setState({
              media_ids: [...this.state.media_ids, body.data[i].id],
              media_urls: [...this.state.media_urls, body.data[i].media_url],
              caption: [...this.state.caption, body.data[i].caption],
            });
          }
          this.setBackground();
        }
      })
    );
  };
  render() {
    return (
      <div className="streamplanWrapper gap">
        <div
          className="streamPlanBackground"
          style={{
            backgroundImage: "url(" + this.state.backgroundImage + ")",
            opacity: this.state.opacity,
          }}
        >
          <img
            className="instaIcon"
            role="presentation"
            src="img/insta/insta_logo.svg"
          />
          <span
            className="headingSmall fontBackground"
            style={{ fontFamily: "BentonSans-Light" }}
          >
            /esportfactory
          </span>
        </div>
      </div>
    );
  }
}
