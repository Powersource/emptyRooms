//'use strict';

const ical = require('ical');
const $ = require("jquery");

// Example usage:
// const rooms = require('./rooms.js');
// const data = new rooms()
const Rooms = class {

	constructor() {
		// This should eventually be replaced with
		// ical.fromUrl
		// https://se.timeedit.net/web/lu/db1/lth1/ri6Q566Z25503QQQ96Z7575Z00yQ71n7123721Y6355Y5X.ics
		//this.json = ical.parseFile('test-ics/2rooms.ics');
		//ical.fromURL('https://se.timeedit.net/web/lu/db1/lth1/ri6Q566Z25503QQQ96Z7575Z00yQ71n7123721Y6355Y5X.ics', {}, (err, data) => {
		/*ical.fromURL('test-ics/2rooms.ics', {}, (err, data) => {
				this.json = data;
				});*/
		return new Promise( (res, rej) => {
			$.get('test-ics/20roomsagain.ics', result => {
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

	getAllRoomInfo() {
		const listOfRooms = this.getListOfRooms();
		console.log(listOfRooms);

		let responseList = [];
		listOfRooms.forEach( room => {
			responseList.push(this.getRoomStartToday(room));
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

	getRoomStartToday(room) {
		return this.formatBookingForDisplay(room, this.bookingList
			// TODO: Update the file before checking the date...
			.filter(b => this.bookingIsToday(b))
			.filter(b => this.bookingIsInRoom(b, room))
			.reduce((prev, cur) => this.returnLaterEndingBooking(prev, cur), {
				end: Date.parse('2010-10-10T00:00:00.000Z tz: undefined'),
				location: 'NOPE'}));
	}

	bookingIsToday(booking) {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(),
				now.getMonth(), now.getDate());
		const endOfToday = new Date(startOfToday.valueOf() + 1000 * 60 * 60 * 24);
		const startOfBooking = Date.parse(booking.start);
		return startOfToday < startOfBooking && startOfBooking < endOfToday;
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
			roomTime: time.getHours() + ':' + time.getMinutes() + '-17:00'}
	}
}

module.exports = Rooms;

//const data = new Rooms();
// Remember to check that there actually are events when testing this
//console.log(data.getAllRoomInfo());
//console.log(data.getAllJson());
