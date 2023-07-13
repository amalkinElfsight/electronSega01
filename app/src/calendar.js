import React from 'react';

export default class calendar extends React.Component {
	constructor() {
		super()
		this.state = {
			kind: "alpha",
			currentDay: "",
			currentMonth: "",
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			carWeek: [],
			carMonday: [],
			carTuesday: [],
			carWednesday: [],
			carThursday: [],
			carFriday: [],
			eventMonday: [],
			eventTuesday: [],
			eventWednesday: [],
			eventThursday: [],
			eventFriday: [],
			dateMonday: "",
			dateTuesday: "",
			dateWednesday: "",
			dateThursday: "",
			dateFriday: "",
			editValueTopic: "",
			editValueDate: "",
			editValueStart: "10:00",
			editValueEnd: "",
			editOpacity: "none",
			editID: "", 
			new: false,
			noteOpacity: 0,
			note: "Please fill everything out."
		}
	}

	componentDidMount() {
		this.getDate()
		this.getMeetings()
		this.getCarpool()
		this.getEvents()
	}

	getMeetings = () => {
		fetch('https://api.airtable.com/v0/appnPkTBTF9IkD0BO/MeetingRooms?api_key=keyyTw4AdYhxFJ6gr')
		.then(response => response.json())
		.then(schedule => {
			//console.log(schedule)
			const meetings = schedule.records.filter(item => item.fields.Start !== "").map(item => { 
				const meeting = new Date(item.fields.Start)
				return {
					...item,
					meeting: meeting.getTime()
				}
			})
			.sort((a,b) => {
				if (a.meeting < b.meeting) return -1
				if (a.meeting == b.meeting) return 0
				return 1
			})
			let monday = meetings.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateMonday)
			let tuesday = meetings.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateTuesday)
			let wednesday = meetings.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateWednesday)
			let thursday = meetings.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateThursday)
			let friday = meetings.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateFriday)
			if (this.state.kind == "alpha") {
				monday = monday.filter(m => m.fields.Location == "Alpha")	
				tuesday = tuesday.filter(m => m.fields.Location == "Alpha")	
				wednesday = wednesday.filter(m => m.fields.Location == "Alpha")	
				thursday = thursday.filter(m => m.fields.Location == "Alpha")	
				friday = friday.filter(m => m.fields.Location == "Alpha")	
			} else if (this.state.kind == "beta") {
				monday = monday.filter(m => m.fields.Location == "Beta")	
				tuesday = tuesday.filter(m => m.fields.Location == "Beta")	
				wednesday = wednesday.filter(m => m.fields.Location == "Beta")	
				thursday = thursday.filter(m => m.fields.Location == "Beta")	
				friday = friday.filter(m => m.fields.Location == "Beta")	
			}
			
			this.setState({
				monday: monday,
				tuesday: tuesday,
				wednesday: wednesday,
				thursday: thursday,
				friday: friday,
			})
		})
	}
	
	getCarpool = () => {
		fetch('https://api.airtable.com/v0/appPE2hcDcM9rjVYm/Carpool?api_key=keyyTw4AdYhxFJ6gr')
		.then(response => response.json())
		.then(schedule => {
			//console.log(schedule)
			this.setState({carWeek: schedule})
			const carshedule = schedule.records.filter(item => item.fields.Start !== "").map(item => { 
				const car = new Date(item.fields.Start)
				return {
					...item,
					car: car.getTime()
				}
			})
			.sort((a,b) => {
				if (a.car < b.car) return -1
				if (a.car == b.car) return 0
				return 1
			})
			let monday = carshedule.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateMonday)
			let tuesday = carshedule.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateTuesday)
			let wednesday = carshedule.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateWednesday)
			let thursday = carshedule.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateThursday)
			let friday = carshedule.filter(m => m.fields.Start.substring(8,10) + "." + m.fields.Start.substring(5,7) == this.state.dateFriday)
			this.setState({
				carMonday: monday,
				carTuesday: tuesday,
				carWednesday: wednesday,
				carThursday: thursday,
				carFriday: friday,
			})
		})
	}

	getEvents = () => {
		fetch('https://api.airtable.com/v0/appljQWBFDLFu8lbO/events?api_key=keyyTw4AdYhxFJ6gr')
	      .then(response => response.json())
	      .then(schedule => {
	      	const events = schedule.records.filter(item => item.fields["Date"] !== "").map(item => { 
	      		const event = new Date(item.fields["Date"])
	      		return {
	      			...item,
	      			event: event.getTime()
	      		}
	      	})
	      	.sort((a,b) => {
	      		if (a.event < b.event) return -1
	      		if (a.event == b.event) return 0
	      		return 1
	      	})
	      	let monday = events.filter(m => m.fields.Date.substring(8,10) + "." + m.fields.Date.substring(5,7) == this.state.dateMonday)
			let tuesday = events.filter(m => m.fields.Date.substring(8,10) + "." + m.fields.Date.substring(5,7) == this.state.dateTuesday)
			let wednesday = events.filter(m => m.fields.Date.substring(8,10) + "." + m.fields.Date.substring(5,7) == this.state.dateWednesday)
			let thursday = events.filter(m => m.fields.Date.substring(8,10) + "." + m.fields.Date.substring(5,7) == this.state.dateThursday)
			let friday = events.filter(m => m.fields.Date.substring(8,10) + "." + m.fields.Date.substring(5,7) == this.state.dateFriday)
			this.setState({
				eventMonday: monday,
				eventTuesday: tuesday,
				eventWednesday: wednesday,
				eventThursday: thursday,
				eventFriday: friday,
			})
	      })	
	}

	getRightDate = (x) => {
		const today = new Date()
		let day = new Date(today.setDate(today.getDate() + x)).getDate()
		let month = new Date(today.setDate(today.getDate() + x)).getMonth() + 1
		if (day == 1) {
			month = month + 1
		}
		if (month < 10) {
			month = "0" + month
		}
		if (day < 10) {
			day = "0" + day
		}
		return day + "." + month
	}

	getDate = () => {
		let today = new Date()
		let day = today.getDay()
		let date = today.getDate()
		let month = today.getMonth() + 1
		this.setState({currentMonth: month < 10 ? "0" + month : month})
		if (day == 0) {
			this.setState({
				dateMonday: this.getRightDate(1),
				dateTuesday: this.getRightDate(2),
				dateWednesday: this.getRightDate(3),
				dateThursday: this.getRightDate(4),
				dateFriday: this.getRightDate(5)
			})
		} else if (day == 1) {
			this.setState({
				dateMonday: this.getRightDate(0),
				dateTuesday: this.getRightDate(1),
				dateWednesday: this.getRightDate(2),
				dateThursday: this.getRightDate(3),
				dateFriday: this.getRightDate(4)
			})
		} else if (day == 2) {
			this.setState({
				dateMonday: this.getRightDate(-1),
				dateTuesday: this.getRightDate(0),
				dateWednesday: this.getRightDate(1),
				dateThursday: this.getRightDate(2),
				dateFriday: this.getRightDate(3)
			})
		} else if (day == 3) {
			this.setState({
				dateMonday: this.getRightDate(-2),
				dateTuesday: this.getRightDate(-1),
				dateWednesday: this.getRightDate(0),
				dateThursday: this.getRightDate(1),
				dateFriday: this.getRightDate(2)
			})
		} else if (day == 4) {
			this.setState({
				dateMonday: this.getRightDate(-3),
				dateTuesday: this.getRightDate(-2),
				dateWednesday: this.getRightDate(-1),
				dateThursday: this.getRightDate(0),
				dateFriday: this.getRightDate(1)
			})
		} else if (day == 5) {
			this.setState({
				dateMonday: this.getRightDate(-4),
				dateTuesday: this.getRightDate(-3),
				dateWednesday: this.getRightDate(-2),
				dateThursday: this.getRightDate(-1),
				dateFriday: this.getRightDate(0)
			})
		} else if (day == 6) {
			this.setState({
				dateMonday: this.getRightDate(-5),
				dateTuesday: this.getRightDate(-4),
				dateWednesday: this.getRightDate(-3),
				dateThursday: this.getRightDate(-2),
				dateFriday: this.getRightDate(-1)
			})
		}

	}

	prevWeek = () => {
	
	}

	nextWeek = () => {
	
	}

	changeTopic = (value) => {
		this.setState({
			kind: value
		}, () => {
			if (this.state.kind == "alpha" || this.state.kind == "beta") {
				this.getMeetings()
			} else if (this.state.kind == "carpool") {
				this.getCarpool()
			} else if (this.state.kind == "events") {
				this.getEvents()
			}
		})
	}
	openEdit = (topic, date, start, end, id) => {
		this.setState({
			editValueStart: "",
			editValueDate: "",
			editValueEnd: "",
			editValueTopic: "",
			editID: ""
		})
		this.returnDate()
		this.setState({
			editOpacity: "block",
			noteOpacity: 0
		})
		if (id == undefined) {
			this.setState({new: true})
			console.log("this is a new entry")
		} else {
			if (this.state.kind == "alpha" || this.state.kind == "beta") {
				this.setState({
					editValueTopic: topic,
					editValueDate: new Date().getFullYear() + "-" + this.state.currentMonth + "-" + date.substring(0,2),
					editValueStart: start,
					editValueEnd: end,
					editID: id
				})
			} else if (this.state.kind == "carpool") {
				this.setState({
					editValueDate: date,
					editValueStart: start,
					editValueEnd: end,
					editID: id
				})
			} else if (this.state.kind == "events") {
				this.setState({
					editValueTopic: topic,
					editValueDate: date,
					editValueStart: start,
					editID: id
				})
			}	
		}
	}

	delete = () => {
		this.setState({editOpacity: "none"})
		if (this.state.kind == "alpha" || this.state.kind == "beta") {
			fetch('https://api.airtable.com/v0/appnPkTBTF9IkD0BO/MeetingRooms/' + this.state.editID, {
	      		method: "DELETE",
	      		headers: {
					'Authorization': 'Bearer keyyTw4AdYhxFJ6gr'
				}
	      	}).then(() => this.getMeetings())
		} else if (this.state.kind == "carpool") {
			fetch('https://api.airtable.com/v0/appPE2hcDcM9rjVYm/Carpool/' + this.state.editID, {
	      		method: "DELETE",
	      		headers: {
					'Authorization': 'Bearer keyyTw4AdYhxFJ6gr'
				}
	      	}).then(() => this.getCarpool())
		} else if (this.state.kind == "events") {
			fetch('https://api.airtable.com/v0/appljQWBFDLFu8lbO/events/' + this.state.editID, {
	      		method: "DELETE",
	      		headers: {
					'Authorization': 'Bearer keyyTw4AdYhxFJ6gr'
				}
	      	}).then(() => this.getEvents())
		}
	}

	cancel = () => {
		this.setState({
			editOpacity: "none",
			editValueStart: "",
			editValueDate: "",
			editValueEnd: "",
			editValueTopic: "",
			editID: ""
		})
	}

	checkIfFree = (date, start, end, id, topic) => {
		if (this.state.kind == "carpool") {
			topic = "carpool"
		}
		if (this.state.kind == "events") {
			end = "openEnd"
		}
		if (topic == undefined || date == undefined || start == undefined || end == undefined) {
			this.setState({
				noteOpacity: 1,
				note: "Please fill everything out."
			})
		} else if (topic == "" || date == "" || start == "" || end == "") {
			this.setState({
				noteOpacity: 1,
				note: "Please fill everything out."
			})
		} else { 
			let day = new Date(date)
			if (this.state.kind == "alpha" || this.state.kind == "beta") {	
				let compareStart = day.setMinutes(start.substring(3,5))
				compareStart = new Date(compareStart).setHours(start.substring(0,2))
				let compareEnd = day.setMinutes(end.substring(3,5))
				compareEnd = new Date(compareEnd).setHours(end.substring(0,2))
				let isBooked = false
				let compareArray = []
				if (day.getDay() == 1) {
					if (this.state.kind == "alpha") {
						compareArray = this.state.monday.filter(m => m.fields.Location == "Alpha")
					} else if (this.state.kind == "beta") {
						compareArray = this.state.monday.filter(m => m.fields.Location == "Beta")
					}
				} else if (day.getDay() == 2) {
					if (this.state.kind == "alpha") {
						compareArray = this.state.tuesday.filter(m => m.fields.Location == "Alpha")
					} else if (this.state.kind == "beta") {
						compareArray = this.state.tuesday.filter(m => m.fields.Location == "Beta")
					}
				} else if (day.getDay() == 3) {
					if (this.state.kind == "alpha") {
						compareArray = this.state.wednesday.filter(m => m.fields.Location == "Alpha")
					} else if (this.state.kind == "beta") {
						compareArray = this.state.wednesday.filter(m => m.fields.Location == "Beta")
					}
				} else if (day.getDay() == 4) {
					if (this.state.kind == "alpha") {
						compareArray = this.state.thursday.filter(m => m.fields.Location == "Alpha")
					} else if (this.state.kind == "beta") {
						compareArray = this.state.thursday.filter(m => m.fields.Location == "Beta")
					}
				} else if (day.getDay() == 5) {
					if (this.state.kind == "alpha") {
						compareArray = this.state.friday.filter(m => m.fields.Location == "Alpha")
					} else if (this.state.kind == "beta") {
						compareArray = this.state.friday.filter(m => m.fields.Location == "Beta")
					}
				}
				for (let i = 0; i < compareArray.length; i++) {
					let correctTimeStart = new Date(compareArray[i].fields.Start)
					let correctTimeEnd = new Date(compareArray[i].fields.End)
					correctTimeStart.setHours(correctTimeStart.getHours() - 2)
					correctTimeEnd.setHours(correctTimeEnd.getHours() - 2)
					if (id != compareArray[i].id) {
						if (new Date(compareStart).getTime() >= new Date(correctTimeStart).getTime() && new Date(compareStart).getTime() <= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Room is already booked at this time."
							})
							isBooked = true
							break
						} else if (new Date(compareEnd).getTime() >= new Date(correctTimeStart).getTime() && new Date(compareEnd).getTime() <= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Room is already booked at this time."
							})
							isBooked = true
							break
						} else if (new Date(compareStart).getTime() <= new Date(correctTimeStart).getTime() && new Date(compareEnd).getTime() >= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Room is already booked at this time."
							})
							isBooked = true
							break
						} else {
							console.log("room is free")
						}
					}
				}
				if (!isBooked) {
					this.edit()
				}
			} else if (this.state.kind == "carpool") {
				let carStart = new Date(start).setHours(0,0,0,0)
				let carEnd = new Date(end).setHours(0, date.substring(0,2), 0, 0)
				let compareArray = []
				let isBooked = false
				day = new Date(start)
				if (day.getDay() == 1) {
					compareArray = this.state.carMonday		
				} else if (day.getDay() == 2) {
					compareArray = this.state.carTuesday
				} else if (day.getDay() == 3) {
					compareArray = this.state.carWednesday
				} else if (day.getDay() == 4) {
					compareArray = this.state.carThursday
				} else if (day.getDay() == 5) {
					compareArray = this.state.carFriday
				}
				console.log(this.state.carWeek.records.length)
				for (let i = 0; i < this.state.carWeek.records.length; i++) {
					//let correctTimeStart = new Date(compareArray[i].fields.Start)
					//let correctTimeEnd = new Date(compareArray[i].fields.End)
					let correctTimeEnd = new Date(this.state.carWeek.records[i].fields.End)
					let correctTimeStart = new Date(this.state.carWeek.records[i].fields.Start)
					console.log(correctTimeStart)
					correctTimeStart.setHours(0,0,0,0)
					correctTimeEnd.setHours(correctTimeEnd.getHours() - 2)
					if (id != this.state.carWeek.records[i].id) {
						if (new Date(carStart).getTime() >= new Date(correctTimeStart).getTime() &&  new Date(carStart).getTime() <= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Car is already booked at this time."
							})
							isBooked = true
							break
						} else if (new Date(carEnd).getTime() >= new Date(correctTimeStart).getTime() && new Date(carEnd).getTime() <= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Car is already booked at this time."
							})
							isBooked = true
							break
						} else if (new Date(carStart).getTime() <= new Date(correctTimeStart).getTime() && new Date(carEnd).getTime() >= new Date(correctTimeEnd).getTime()) {
							this.setState({
								noteOpacity: 1,
								note: "Car is already booked at this time."
							})
							isBooked = true
							break
						} else {
							console.log("car is free")
						}
					}
				}
				if (!isBooked) {
					this.edit()
				}
			} else if (this.state.kind == "events") {
				this.edit()
			}
		}
	}

	edit = () => {
		this.setState({editOpacity: "none"})
		if (this.state.new == true ) {
			if (this.state.kind == "alpha" || this.state.kind == "beta") {
				fetch('https://api.airtable.com/v0/appnPkTBTF9IkD0BO/MeetingRooms/', {
		      		method: "POST",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Activity: this.state.editValueTopic,
						    Start: this.state.editValueDate + " " + this.state.editValueStart,
						    End: this.state.editValueDate + " " + this.state.editValueEnd,
						    Location: this.state.kind == "alpha" ? "Alpha" : "Beta"
						  }
					})
		      	}).then(() => this.getMeetings())
			} else if (this.state.kind == "carpool") {
				fetch('https://api.airtable.com/v0/appPE2hcDcM9rjVYm/Carpool/', {
		      		method: "POST",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Start: this.state.editValueStart ,
						    End: this.state.editValueEnd,
						    Time: this.state.editValueDate
						  }
					})
		      	}).then(() => this.getCarpool())
			} else if (this.state.kind == "events") {
				fetch('https://api.airtable.com/v0/appljQWBFDLFu8lbO/events/', {
		      		method: "POST",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Location: this.state.editValueTopic,
						    Date: this.state.editValueDate,
						    Time: this.state.editValueStart
						  }
					})
		      	}).then(() => this.getEvents())
			}
			this.setState({new: false})
		} else {
			if (this.state.kind == "alpha" || this.state.kind == "beta") {
				fetch('https://api.airtable.com/v0/appnPkTBTF9IkD0BO/MeetingRooms/' + this.state.editID, {
		      		method: "PUT",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Activity: this.state.editValueTopic,
						    Start: this.state.editValueDate + " " + this.state.editValueStart,
						    End: this.state.editValueDate + " " + this.state.editValueEnd,
						    Location: this.state.kind == "alpha" ? "Alpha" : "Beta"
						  }
					})
		      	}).then(() => this.getMeetings())
			} else if (this.state.kind == "carpool") {
				fetch('https://api.airtable.com/v0/appPE2hcDcM9rjVYm/Carpool/' + this.state.editID, {
		      		method: "PUT",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Start: this.state.editValueStart ,
						    End: this.state.editValueEnd,
						    Time: this.state.editValueDate
						  }
					})
		      	}).then(() => this.getCarpool())
			} else if (this.state.kind == "events") {
				fetch('https://api.airtable.com/v0/appljQWBFDLFu8lbO/events/' + this.state.editID, {
		      		method: "PUT",
		      		headers: {
						'Authorization': 'Bearer keyyTw4AdYhxFJ6gr',
					    'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						fields: {
						    Location: this.state.editValueTopic,
						    Date: this.state.editValueDate,
						    Time: this.state.editValueStart
						  }
					})
		      	}).then(() => this.getEvents())
			}
		}
		this.cancel()
	}

	handleChange = (event) => {
		this.setState({editValueTopic: event.target.value})
	}

	editStartChange = (event) => {
		this.setState({editValueStart: event.target.value})
	}

	editEndChange = (event) => {
		this.setState({editValueEnd: event.target.value})
	}

	editDateChange = (event) => {
		this.setState({editValueDate: event.target.value})
	}

	returnDate = (first, second) => {
		let firstDate = new Date(first)
		let secondDate = new Date(second)
		let timeRange = secondDate - firstDate
		let test = (timeRange / 3600000) % 24
		return "(" + test + "h)"
	}

	render() {
	    return (
	    	<div className="calendarWrapper">
	    		<div className="calendarUI">
	    			<ul className="calendarMenu">
	    				<li className={this.state.kind == "alpha" ? "filter activeFilter textSmall" : "filter textSmall"} onClick={() => this.changeTopic("alpha")}>Alpha</li>
	    				<li className={this.state.kind == "beta" ? "filter activeFilter textSmall" : "filter textSmall"} onClick={() => this.changeTopic("beta")}>Beta</li>
	    				<li className={this.state.kind == "carpool" ? "filter activeFilter textSmall" : "filter textSmall"} onClick={() => this.changeTopic("carpool")}>Carpool</li>
	    				<li className={this.state.kind == "events" ? "filter activeFilter textSmall" : "filter textSmall"} onClick={() => this.changeTopic("events")}>Events</li>
	    			</ul>
	    			<div className="add" onClick={() => this.openEdit()}>
	    			</div>
	    		</div>
	    		<div className="calendarTitles">
		    		<div className="weekControl hide">
		    			<div className="prevWeek" onClick={this.prevWeek}>
		    			</div>
		    			<div className="nextWeek" onClick={this.nextWeek}>
		    			</div>
		    		</div>
		    		<div className="day">
		    			<p className="textMini" style={{marginBottom: "0px"}}>{this.state.dateMonday}.{this.state.currentMonth}</p>
		    			<h1 className="headingSmall" style={{marginTop: "0px"}}>Monday</h1>
		    		</div>
		    		<div className="day">
		    			<p className="textMini" style={{marginBottom: "0px"}}>{this.state.dateTuesday}.{this.state.currentMonth}</p>
		    			<h1 className="headingSmall" style={{marginTop: "0px"}}>Tuesday</h1>
		    		</div>
		    		<div className="day">
		    			<p className="textMini" style={{marginBottom: "0px"}}>{this.state.dateWednesday}.{this.state.currentMonth}</p>
		    			<h1 className="headingSmall" style={{marginTop: "0px"}}>Wednesday</h1>
		    		</div>
		    		<div className="day">
		    			<p className="textMini" style={{marginBottom: "0px"}}>{this.state.dateThursday}.{this.state.currentMonth}</p>
		    			<h1 className="headingSmall" style={{marginTop: "0px"}}>Thursday</h1>
		    		</div>
		    		<div className="day">
		    			<p className="textMini" style={{marginBottom: "0px"}}>{this.state.dateFriday}.{this.state.currentMonth}</p>
		    			<h1 className="headingSmall" style={{marginTop: "0px"}}>Friday</h1>
		    		</div>
		    	</div>
		    	<div className="calendarData">
		    		<ul className="dataMonday">				    	
				    	{this.state.kind == "alpha" || this.state.kind == "beta" ? 
				    		this.state.monday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit(
				    				this.state.monday[index].fields.Activity, 
				    				this.state.dateMonday, 
				    				this.state.monday[index].fields.Start.substring(11,16), 
				    				this.state.monday[index].fields.End.substring(11,16), 
				    				this.state.monday[index].id)} 
				    				key={index}>
						        	<p className="textSmall calendarDataText">{this.state.monday[index].fields.Activity}</p>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.monday[index].fields.Start.substring(11,16)} - {this.state.monday[index].fields.End.substring(11,16)}</p>
						        	<span className="textSmall">{this.returnDate(this.state.monday[index].fields.Start, this.state.monday[index].fields.End)}</span>
						        </li>		
					   		))
				    	: this.state.kind == "carpool" ?
				    		this.state.carMonday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit("", this.state.carMonday[index].fields.Time, 
				    				this.state.carMonday[index].fields.Start, 
				    				this.state.carMonday[index].fields.End, 
				    				this.state.carMonday[index].id)} 
				    				key={index}>
						        	<span className="textSmall">Taken until </span>
						        	<span className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.carMonday[index].fields.End.substring(8,11)}.{this.state.carMonday[index].fields.End.substring(5,7)} - {this.state.carMonday[index].fields.Time}</span>
						        </li>
					    	))
				    	: this.state.kind == "events" ?
				    		this.state.eventMonday.map((value, index) => (
				    			<li className="calendarListpoint" onClick onClick={() => this.openEdit(
				    				this.state.eventMonday[index].fields.Location, 
				    				this.state.eventMonday[index].fields.Date,
				    				this.state.eventMonday[index].fields.Time,
				    				"",   
				    				this.state.eventMonday[index].id)} 
				    				key={index}>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.eventMonday[index].fields.Location}</p>
						        	<p className="textSmall">{this.state.eventMonday[index].fields.Time}</p>	
						        </li>
					    	))
					    : ""
				    	}
					</ul>
					<ul className="dataTuesday">
				    	{this.state.kind == "alpha" || this.state.kind == "beta" ? 
				    		this.state.tuesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit(
				    				this.state.tuesday[index].fields.Activity, 
				    				this.state.dateTuesday, 
				    				this.state.tuesday[index].fields.Start.substring(11,16), 
				    				this.state.tuesday[index].fields.End.substring(11,16), 
				    				this.state.tuesday[index].id)} 
				    				key={index}>
						        	<p className="textSmall">{this.state.tuesday[index].fields.Activity}</p>
						        	<p className="textSmall">{this.state.tuesday[index].fields.Start.substring(11,16)} - {this.state.tuesday[index].fields.End.substring(11,16)}</p>
						        	<span className="textSmall">{this.returnDate(this.state.tuesday[index].fields.Start, this.state.tuesday[index].fields.End)}</span>
						        </li>		
					   		))
				    	: this.state.kind == "carpool" ?
				    		this.state.carTuesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit("", 
				    				this.state.carTuesday[index].fields.Time, 
				    				this.state.carTuesday[index].fields.Start, 
				    				this.state.carTuesday[index].fields.End, 
				    				this.state.carTuesday[index].id)} 
				    				key={index}>
						        	<span className="textSmall">Taken until </span>
						        	<span className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.carTuesday[index].fields.End.substring(8,11)}.{this.state.carTuesday[index].fields.End.substring(5,7)} - {this.state.carTuesday[index].fields.Time}</span>
						        </li>
					    	))
				    	: this.state.kind == "events" ?
				    		this.state.eventTuesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick onClick={() => this.openEdit(
				    				this.state.eventTuesday[index].fields.Location, 
				    				this.state.eventTuesday[index].fields.Date,
				    				this.state.eventTuesday[index].fields.Time,
				    				"",   
				    				this.state.eventTuesday[index].id)} 
				    				key={index}>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.eventTuesday[index].fields.Location}</p>
						        	<p className="textSmall">{this.state.eventTuesday[index].fields.Time}</p>	
						        </li>
					    	))
					    : ""
				    	}
					</ul>
					<ul className="dataWednesday">
				    	{this.state.kind == "alpha" || this.state.kind == "beta" ? 
				    		this.state.wednesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit(
				    				this.state.wednesday[index].fields.Activity, 
				    				this.state.dateWednesday, 
				    				this.state.wednesday[index].fields.Start.substring(11,16), 
				    				this.state.wednesday[index].fields.End.substring(11,16), 
				    				this.state.wednesday[index].id)} 
				    				key={index}>
						        	<p className="textSmall">{this.state.wednesday[index].fields.Activity}</p>
						        	<p className="textSmall">{this.state.wednesday[index].fields.Start.substring(11,16)} - {this.state.wednesday[index].fields.End.substring(11,16)}</p>
						        	<span className="textSmall">{this.returnDate(this.state.wednesday[index].fields.Start, this.state.wednesday[index].fields.End)}</span>
						        </li>		
					   		))
				    	: this.state.kind == "carpool" ?
				    		this.state.carWednesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit("", 
				    				this.state.carWednesday[index].fields.Time, 
				    				this.state.carWednesday[index].fields.Start, 
				    				this.state.carWednesday[index].fields.End, 
				    				this.state.carWednesday[index].id)} 
				    				key={index}>
						        	<span className="textSmall">Taken until </span>
						        	<span className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.carWednesday[index].fields.End.substring(8,11)}.{this.state.carWednesday[index].fields.End.substring(5,7)} - {this.state.carWednesday[index].fields.Time}</span>
						        </li>
					    	))
				    	: this.state.kind == "events" ?
				    		this.state.eventWednesday.map((value, index) => (
				    			<li className="calendarListpoint" onClick onClick={() => this.openEdit(
				    				this.state.eventWednesday[index].fields.Location, 
				    				this.state.eventWednesday[index].fields.Date,
				    				this.state.eventWednesday[index].fields.Time,
				    				"",   
				    				this.state.eventWednesday[index].id)} 
				    				key={index}>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.eventWednesday[index].fields.Location}</p>
						        	<p className="textSmall">{this.state.eventWednesday[index].fields.Time}</p>	
						        </li>
					    	))
					    : ""
				    	}
					</ul>
					<ul className="dataThursday">
				    	{this.state.kind == "alpha" || this.state.kind == "beta" ? 
				    		this.state.thursday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit(
				    				this.state.thursday[index].fields.Activity, 
				    				this.state.dateThursday, 
				    				this.state.thursday[index].fields.Start.substring(11,16), 
				    				this.state.thursday[index].fields.End.substring(11,16), 
				    				this.state.thursday[index].id)} 
				    				key={index}>
						        	<p className="textSmall">{this.state.thursday[index].fields.Activity}</p>
						        	<p className="textSmall">{this.state.thursday[index].fields.Start.substring(11,16)} - {this.state.thursday[index].fields.End.substring(11,16)}</p>
						        	<span className="textSmall">{this.returnDate(this.state.thursday[index].fields.Start, this.state.thursday[index].fields.End)}</span>
						        </li>		
					   		))
				    	: this.state.kind == "carpool" ?
				    		this.state.carThursday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit("", 
				    				this.state.carThursday[index].fields.Time, 
				    				this.state.carThursday[index].fields.Start, 
				    				this.state.carThursday[index].fields.End, 
				    				this.state.carThursday[index].id)} 
				    				key={index}>
						        	<span className="textSmall">Taken until </span>
						        	<span className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.carThursday[index].fields.End.substring(8,11)}.{this.state.carThursday[index].fields.End.substring(5,7)} - {this.state.carThursday[index].fields.Time}</span>
						        </li>
					    	))
				    	: this.state.kind == "events" ?
				    		this.state.eventThursday.map((value, index) => (
				    			<li className="calendarListpoint" onClick onClick={() => this.openEdit(
				    				this.state.eventThursday[index].fields.Location, 
				    				this.state.eventThursday[index].fields.Date,
				    				this.state.eventThursday[index].fields.Time,
				    				"",   
				    				this.state.eventThursday[index].id)} 
				    				key={index}>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.eventThursday[index].fields.Location}</p>
						        	<p className="textSmall">{this.state.eventThursday[index].fields.Time}</p>	
						        </li>
					    	))
					    : ""
				    	}
					</ul>
					<ul className="dataFriday">
				    	{this.state.kind == "alpha" || this.state.kind == "beta" ? 
				    		this.state.friday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit(
				    				this.state.friday[index].fields.Activity, 
				    				this.state.dateFriday, 
				    				this.state.friday[index].fields.Start.substring(11,16), 
				    				this.state.friday[index].fields.End.substring(11,16), 
				    				this.state.friday[index].id)} key={index}>
						        	<p className="textSmall">{this.state.friday[index].fields.Activity}</p>
						        	<p className="textSmall">{this.state.friday[index].fields.Start.substring(11,16)} - {this.state.friday[index].fields.End.substring(11,16)}</p>
						        	<span className="textSmall">{this.returnDate(this.state.friday[index].fields.Start, this.state.friday[index].fields.End)}</span>
						        </li>		
					   		))
				    	: this.state.kind == "carpool" ?
				    		this.state.carFriday.map((value, index) => (
				    			<li className="calendarListpoint" onClick={() => this.openEdit("", 
				    				this.state.carFriday[index].fields.Time, 
				    				this.state.carFriday[index].fields.Start, 
				    				this.state.carFriday[index].fields.End, 
				    				this.state.carFriday[index].id)} 
				    				key={index}>
						        	<span className="textSmall">Taken until </span>
						        	<span className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.carFriday[index].fields.End.substring(8,11)}.{this.state.carFriday[index].fields.End.substring(5,7)} - {this.state.carFriday[index].fields.Time}</span>
						        </li>
					    	))
				    	: this.state.kind == "events" ?
				    		this.state.eventFriday.map((value, index) => (
				    			<li className="calendarListpoint" onClick onClick={() => this.openEdit(
				    				this.state.eventFriday[index].fields.Location, 
				    				this.state.eventFriday[index].fields.Date,
				    				this.state.eventFriday[index].fields.Time,
				    				"",   
				    				this.state.eventFriday[index].id)} 
				    				key={index}>
						        	<p className="textSmall" style={{fontFamily: "BentonSans"}}>{this.state.eventFriday[index].fields.Location}</p>
						        	<p className="textSmall">{this.state.eventFriday[index].fields.Time}</p>	
						        </li>
					    	))
					    : ""
				    	}
					</ul>
		    	</div>
		    	<div className="edit" style={{display: this.state.editOpacity}}>
		    		{this.state.kind == "alpha" || this.state.kind == "beta" ?
		    			<div className="editOptions">
		    				<h1 className="textSmall">Topic</h1>
				    		<input type="text" className="editTopic" value={this.state.editValueTopic} onChange={this.handleChange}></input>
				    		<h1 className="textSmall">Date</h1>
				    		<input type="date" value={this.state.editValueDate} onChange={this.editDateChange}></input>
				    		<div className="editTime">
					    		<div>
					    			<h1 className="textSmall">Start</h1>
						    		<select value={this.state.editValueStart} onChange={this.editStartChange}>
									  <option value="08:00">08:00</option>
									  <option value="08:30">08:30</option>
									  <option value="09:00">09:00</option>
									  <option value="09:30">09:30</option>
									  <option value="10:00">10:00</option>
									  <option value="10:30">10:30</option>
									  <option value="11:00">11:00</option>
									  <option value="11:30">11:30</option>
									  <option value="12:00">12:00</option>
									  <option value="12:30">12:30</option>
									  <option value="13:00">13:00</option>
									  <option value="13:30">13:30</option>
									  <option value="14:00">14:00</option>
									  <option value="14:30">14:30</option>
									  <option value="15:00">15:00</option>
									  <option value="15:30">15:30</option>
									  <option value="16:00">16:00</option>
									  <option value="16:30">16:30</option>
									  <option value="17:00">17:00</option>
									  <option value="17:30">17:30</option>
									  <option value="18:00">18:00</option>
									</select>
								</div>
								<div>	
						    		<h1 className="textSmall">End</h1>
						    		<select value={this.state.editValueEnd} onChange={this.editEndChange}>
									  <option value="08:00">08:00</option>
									  <option value="08:30">08:30</option>
									  <option value="09:00">09:00</option>
									  <option value="09:30">09:30</option>
									  <option value="10:00">10:00</option>
									  <option value="10:30">10:30</option>
									  <option value="11:00">11:00</option>
									  <option value="11:30">11:30</option>
									  <option value="12:00">12:00</option>
									  <option value="12:30">12:30</option>
									  <option value="13:00">13:00</option>
									  <option value="13:30">13:30</option>
									  <option value="14:00">14:00</option>
									  <option value="14:30">14:30</option>
									  <option value="15:00">15:00</option>
									  <option value="15:30">15:30</option>
									  <option value="16:00">16:00</option>
									  <option value="16:30">16:30</option>
									  <option value="17:00">17:00</option>
									  <option value="17:30">17:30</option>
									  <option value="18:00">18:00</option>
									</select>
					    		</div>
					    	</div>
					    	<p className="note" style={{opacity: this.state.noteOpacity}}>{this.state.note}</p>
		    			</div>
		    		: this.state.kind == "carpool" ? 
		    			<div style={{marginBottom: "50px"}}>
				    		<div className="editTimeCar">
				    			<h1 className="textSmall">Start</h1>
					    		<input type="date" value={this.state.editValueStart} onChange={this.editStartChange}></input>
					    		<h1 className="textSmall">End</h1>
					    		<input type="date" value={this.state.editValueEnd} onChange={this.editEndChange}></input>
				    		</div>
				    		<h1 className="textSmall" style={{display: "inline", marginRight: "15px"}}>Untill</h1>
				    		<select value={this.state.editValueDate} onChange={this.editDateChange}>
							  <option value="12:00">12:00</option>
							  <option value="18:00">18:00</option>
							</select>
							<p className="note" style={{opacity: this.state.noteOpacity}}>{this.state.note}</p>
		    			</div>
		    		: 	<div style={{marginBottom: "50px"}}>
				    		<h1 className="textSmall ">Topic</h1>
				    		<input type="text editTopic" value={this.state.editValueTopic} onChange={this.handleChange}></input>
				    		<h1 className="textSmall">Date</h1>
				    		<input type="date" value={this.state.editValueDate} onChange={this.editDateChange}></input>
			    			<div style={{display: "flex"}}>
				    			<h1 className="textSmall" style={{display: "inline", marginRight: "15px"}}>Start</h1>
					    		<select value={this.state.editValueStart} onChange={this.editStartChange}>
								  <option value="08:00">08:00</option>
								  <option value="08:30">08:30</option>
								  <option value="09:00">09:00</option>
								  <option value="09:30">09:30</option>
								  <option value="10:00">10:00</option>
								  <option value="10:30">10:30</option>
								  <option value="11:00">11:00</option>
								  <option value="11:30">11:30</option>
								  <option value="12:00">12:00</option>
								  <option value="12:30">12:30</option>
								  <option value="13:00">13:00</option>
								  <option value="13:30">13:30</option>
								  <option value="14:00">14:00</option>
								  <option value="14:30">14:30</option>
								  <option value="15:00">15:00</option>
								  <option value="15:30">15:30</option>
								  <option value="16:00">16:00</option>
								  <option value="16:30">16:30</option>
								  <option value="17:00">17:00</option>
								  <option value="17:30">17:30</option>
								  <option value="18:00">18:00</option>
								</select>
							</div>
							<p className="note" style={{opacity: this.state.noteOpacity}}>{this.state.note}</p>
		    			</div>
		    		}
		    		<div className="editButtons">
			    		<a className="textSmall" onClick={() => this.checkIfFree(this.state.editValueDate, this.state.editValueStart, this.state.editValueEnd, this.state.editID, this.state.editValueTopic)}>Save</a>
			    		<a className="textSmall" onClick={() => this.delete()}>Delete</a>
			    		<a className="textSmall" onClick={() => this.cancel()}>Cancel</a>
			    	</div>
		    	</div>
	    	</div>
	    );
  }
}