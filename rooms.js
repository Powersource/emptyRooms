'use strict';

const ical = require('ical');

// Example usage:
// const rooms = require('./rooms.js');
// const data = new rooms()
const Rooms = class {

	constructor() {
		// This should eventually be replaced with
		// ical.fromUrl
		this.json = ical.parseFile('test-ics/2rooms.ics');
		// The json object turned into a list
		this.bookingList = Object.keys(this.json)
			.map(booking => this.json[booking]);
	}

	getAllJson() {
		return this.json;
	}

	getRoomStartToday(room) {
		let i = 0;
		return this.bookingList
			//.forEach(b => console.log(JSON.stringify(b, null, 4) + this.bookingIsToday(b)));
			// TODO: Update the file before checking the date...
			.filter(b => this.bookingIsToday(b))
			.forEach(b => console.log(b));
			/*.filter(e => eventIsInRoom(e, room)
			 * .map(this json format -> the format at the
			 * 	bottom of index.android.js)
			 */
	}

	bookingIsToday(booking) {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(),
				now.getMonth(), now.getDate());
		const endOfToday = new Date(startOfToday.valueOf() + 1000 * 60 * 60 * 24);
		const startOfBooking = Date.parse(booking.start);
		return startOfToday < startOfBooking && startOfBooking < endOfToday;
	}
}

module.exports = Rooms;

const data = new Rooms();
// Remember to check that there actually are events when testing this
console.log(data.getRoomStartToday('V:N1'));
