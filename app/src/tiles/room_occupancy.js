import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default class hints extends React.Component {
  constructor() {
    super();
    this.state = {
      followers_count: "",
      img: 1,
    };
  }

  componentDidMount() {
    // this.getDate();
    this.intervalId = setInterval(this.switchImages.bind(this), 10000)
  }

  // getDate = () => {
  //   let today = new Date();
  //   let currentDay = today.getDay();
  //   let firstDay = new Date(today);
  //   firstDay.setDate(firstDay.getDate() - currentDay);

  //   for (let i = 1; i < 8; i++) {
  //     //console.log(firstDay);
  //     let tempDate = firstDay.setDate(firstDay.getDate() + 1);
  //     let tempYear = new Date(tempDate).getFullYear();
  //     let tempMonth = new Date(tempDate).getMonth() + 1;
  //     if (tempMonth < 10) {
  //       tempMonth = "0" + tempMonth.toString();
  //     }
  //     let tempDday = new Date(tempDate).getUTCDate();

  //     //console.log(tempYear + "-" + parseInt(tempMonth) + "-" + tempDday);
  //     this.setState((prevState) => ({
  //       week: [...prevState.week, tempYear + "-" + tempMonth + "-" + tempDday],
  //     }));
  //   }
  //   setTimeout(() => {
  //     // console.log(this.state.week);
  //   }, 5000);
  // };

  switchImages = () => {
    if (this.state.img < 5) {
      this.setState({ img: this.state.img + 1 });
    } else {
      this.setState({ img: 1 });
    }
  }

  render() {
    return (
      <div className="roomOccupancyWrapper gap">
        <div className="roomOccupancyBG"
          style={{
            backgroundImage: "url(img/impressions/img-" + this.state.img + ".jpg)"
          }}
        >
        </div>
        {/*<TwitterTimelineEmbed
          sourceType="profile"
          noHeader="true"
          theme="dark"
          noFooter="true"
          noBorders="true"
          noScrollbar="true"
          transparent="true"
          screenName="esportfactoryde"
          tweetLimit="1"
          options={{ height: "400px" }}
        />*/}
      </div>

    );
  }
}
