import React from 'react';

export default class meeting extends React.Component {
	constructor() {
		super()
		this.state = {
			sponsor: 1, 
			transistionClass: ''
		}
	}

	componentDidMount() {
		this.changeLogo()
		this.intervalId = setInterval(this.changeLogo.bind(this), 5000)
	}

	changeLogo = () => {
		this.setState({
			transistionClass: 'sponsorLogoTransition '
		})
		setTimeout(() => { 
			if (this.state.sponsor < 4) {
				this.setState({ sponsor: this.state.sponsor + 1 })
			} else {
				this.setState({sponsor: 1})
			}
		}, 250);
		setTimeout(() => { 
			this.setState({ transistionClass: ' ' })
		}, 500);
	}

	render() {
	    return (
	    	<div className="sponsorWrapper gap">
				<svg height="0" width="0">
					<defs>
						<clipPath id="sponsors_border">
							<path fill="#FFFFFF" stroke="#000000" strokeWidth="1.5794" strokeMiterlimit="10" d="M438.55,13.14V175.39H222.16s-16.85-12.64-16.85-12.64H116.5s-16.02,12.64-16.02,12.64H.5v-46.17s0-8.27,0-8.27V60.17s0-46.61,0-46.61H254.72s15.41-13.06,15.41-13.06h95.87s15.17,12.64,15.17,12.64h57.38Z"/>
						</clipPath>
					</defs>
				</svg>
	    		<div className={"sponsorLogo "  + this.state.transistionClass + "sponsor" + this.state.sponsor}><img src={"img/sponsors/" + this.state.sponsor + ".png" } /></div>
				<div className={"sponsorLogoTransition"}><img src={"img/sponsors/" + this.state.sponsor + ".png" } /></div>
	    	</div>
	    );
  }
}