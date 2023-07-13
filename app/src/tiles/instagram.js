import React from "react";

export default class instagram extends React.Component {
  constructor() {
    super();
    this.state = {
      insta_id: "17841407781965023",
      instagram_access_token:
        "EABNai5Xbsu0BAHDcQ1PqmtAfMkFQQB7GvZAZB5dVSANK8sWQNfAscmrdDwBDoG9RcbGn3y6xll11vp3R1OtrfIfk5DJH3ut3SUvInymlWwR7Mt7c4CkZBuATqiDNQYi3t34CwZBI85thP72uVLJ0U2lqo9s2rmCK2gOUEwvpjQZDZD",
      media_ids: [],
      media_urls: [],
      opacity: 0,
      backgroundImage: "",
      id: 0,
    };
  }

  componentDidMount() {
    this.getInstaImgs();
    this.intervalId = setInterval(this.getInstaImgs.bind(this), 8640000);
    this.intervalId = setInterval(this.setBackground.bind(this), 25000);
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
      "https://graph.facebook.com/v14.0/" +
        this.state.insta_id +
        "?fields=media&access_token=" +
        this.state.instagram_access_token
    ).then((resp) =>
      resp.json().then((body) => {
        let i = 0;
        for (i = 0; i < 5; i++) {
          this.setState({
            media_ids: [...this.state.media_ids, body.media.data[i].id],
          });
        }
        let y = 0;
        for (y = 0; y < 5; y++) {
          fetch(
            "https://graph.facebook.com/" +
              this.state.media_ids[y] +
              "?fields=media_url&access_token=" +
              this.state.instagram_access_token
          ).then((resp) =>
            resp.json().then((data) => {
              this.setState({
                media_urls: [...this.state.media_urls, data.media_url],
              });
              this.setBackground();
            })
          );
        }
      })
    );
  };

  render() {
    return (
      <div
        className="instagramWrapper gap"
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
    );
  }
}
