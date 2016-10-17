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
	}

	getAllJson() {
		return this.json;
	}

	getRoomStartToday(room) {
		let i = 0;
		// Turn the json object into a list
		// of events to make it filterable
		return Object.keys(this.json)
			.map(key => this.json[key])
			.forEach(e => console.log(e.location));
			// TODO: Update the file before checking the date...
			//.filter(e => eventIsToday(e))
			/*.filter(e => eventIsInRoom(e, room)
			 * .map(this json format -> the format at the
			 * 	bottom of index.android.js)
			 */
	}
}

module.exports = Rooms;

const data = new Rooms();
// Remember to check that there actually are events when testing this
console.log(data.getRoomStartToday('V:N1'));
console.log(data.getAllJson());
