import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

export default class carpool extends React.Component {
	constructor() {
		super()
		this.state = {
			followers_count: ""
		}
	}

	componentDidMount() { 

	}
		
	render() {
	    return (
	    	<div className="twitter_timeline gap">
				<TwitterTimelineEmbed 
					sourceType="profile" 
					noHeader="true" 
					noFooter="true" 
					noScrollbar="true" 
					transparent="true" 
					screenName="esportfactoryde"
					tweetLimit="3" 
					options={{height: 1080}} 
				/>
			</div>

	    );
  }
}