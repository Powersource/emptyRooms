//'use strict';

const ical = require('ical');
const $ = require("jquery");

// Example usage:
// const rooms = require('./rooms.js');
// const data = new rooms()
const Rooms = class {

	constructor() {
		return new Promise( (res, rej) => {
			// To get this to work in plain node we need
			// a certain hack to fake a document or jquery
			// gets pissed.
			$.get('test-ics/20rooms.ics', result => {
				this.json = ical.parseICS(result);
				// The json object turned into a list
				this.bookingList = Object.keys(this.json)
					.map(booking => this.json[booking]);
				res(this);
			});
		});
	}

	getAllJson() {
		return this.json;
	}

	getDemoInfo() {
		return [
		{roomName:'E:3316', roomTime:'08:00-17:00'},
		{roomName:'E:3317', roomTime:'09:00-17:00'},
		{roomName:'E:1149', roomTime:'10:00-17:00'},
		{roomName:'M:1149', roomTime:'10:00-17:00'},
		{roomName:'M:1', roomTime:'10:00-17:00'},
		{roomName:'E:A', roomTime:'10:00-17:00'},
		{roomName:'E:Varg', roomTime:'10:00-17:00'},
		{roomName:'V:O1', roomTime:'10:00-17:00'},
		{roomName:'E:Jupiter', roomTime:'10:00-17:00'},
		{roomName:'K:emicentrum', roomTime:'10:00-17:00'},
		{roomName:'E:3318', roomTime:'10:00-17:00'},
		{roomName:'E:3318', roomTime:'11:00-17:00'}];
	}

	getAllRoomInfo(dayShift) {
		const listOfRooms = this.getListOfRooms();

		let responseList = [];
		listOfRooms.forEach( room => {
			responseList.push(this.getRoomStart(room, dayShift));
		});
		return responseList;
	}

	getListOfRooms() {
		let list = [];
		this.bookingList.forEach( booking => {
			booking.location
				.split(', ')
				.forEach( room => {
					if(list.indexOf(room) === -1) {
						list.push(room);
					}
				});
		});
		return list;
	}

	getRoomStart(room, dayShift) {
		return this.formatBookingForDisplay(room, this.bookingList
			.filter(b => this.bookingIsOnDay(b, dayShift))
			.filter(b => this.bookingIsInRoom(b, room))
			.reduce((prev, cur) => this.returnLaterEndingBooking(prev, cur), {
				// If you remove everything after the Z it actually
				// returns a number. But don't do that, we currently
				// depend on it being NaN :)
				end: Date.parse('2010-10-10T00:00:00.000Z tz: undefined'),
				location: 'NOPE'}));
	}

	bookingIsOnDay(booking, dayShift) {
		const now = new Date();
		const dayMillis = 1000 * 60 * 60 * 24;
		const startOfDay = new Date(
				new Date(now.getFullYear(),
				now.getMonth(), now.getDate())
				.valueOf() + dayShift * dayMillis);
		const endOfDay = new Date(startOfDay.valueOf() + dayMillis);
		const startOfBooking = Date.parse(booking.start);
		return startOfDay < startOfBooking && startOfBooking < endOfDay;
	}

	bookingIsInRoom(booking, room) {
		return booking.location
			.split(', ')
			.includes(room);
	}

	returnLaterEndingBooking(prev, cur) {
		if(Date.parse(prev.end).valueOf() > Date.parse(cur.end).valueOf()) {
			return prev;
		} else {
			return cur;
		}
	}

	formatBookingForDisplay(room, booking) {
		const time = new Date(booking.end);
		return {roomName: room,
			roomTime: (() => {
				if(isNaN(time.getHours())){
					return 'All day';
				} else {
					return this.leftPadTime(time.getHours()) + ':' +
							this.leftPadTime(time.getMinutes());
				}
				})()
		}
	}

	// Think about using a package for this
	leftPadTime(time) {
		time = time.toString();
		if(time.length === 1) {
			return '0' + time;
		} else {
			return time;
		}
	}
}

module.exports = Rooms;
