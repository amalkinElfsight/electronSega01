import React from 'react';
import Welcome from './tiles/welcome';
import Sponsors from './tiles/sponsors';
import Twitter from './tiles/twitter';
import TwitchFollower from './tiles/twitch_follower';
import InstagramFollower from './tiles/instagram_follower';
import Ads from './tiles/ads';
import Wlan from './tiles/wlan';
import CurrentStatistics from './tiles/current_statistics';
import Teams from './tiles/teams';
import RoomOccipancy from './tiles/room_occupancy';
import FunFact from './tiles/fun_fact';
import Map from './tiles/map';
import Feedback_ef from './tiles/feedback_ef';
import Streamplan from './tiles/streamplan';
import LastEvent from './tiles/last_event';
import NextEvent from './tiles/next_event';

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			isBirthday: false,
			birthdayName: ""
		}
	}

	componentWillReceiveProps() {
		//console.log("react main.js is loaded");
	}

	render() {
    	return (
    		<div className="dashboardWrapper">
    			<div className="col" style={{ width: "22.4%", marginRight: "0.7%", marginLeft: "0.5%", marginTop: "0.5%"}}>
	    			<Welcome />
					<Wlan />
					<CurrentStatistics />
					<Teams />
	    		</div>
    			<div className="col" style={{width: "23.4%", marginRight: "0.7%", marginLeft: "0.7%", marginTop: "0.5%"}}>
					<Twitter />
					<RoomOccipancy />
					<FunFact />
    				<InstagramFollower />
    			</div>
    			<div className="col" style={{width: "22.9%", marginRight: "0.7%", marginLeft: "0.7%", marginTop: "0.5%"}}>
					<Ads />
					<Sponsors />
					<Map />
					<Feedback_ef />
    			</div>
    			<div className="col" style={{width: "24.5%", marginRight: "0.5%", marginLeft: "0.7%", marginTop: "0.5%"}}>
					<Streamplan />
					<TwitchFollower />
					<LastEvent />
					<NextEvent />
				</div>
			</div>
		);
	}
}