import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Rooms from './rooms.js';

class App extends Component {
	constructor () {
		super()
		this.state = {ROOMS: [{roomName:'E:3318', roomTime:'16:00-17:00'}],
		day: "0"}
		new Rooms().then( (data) => {
			this.setState({ROOMS: data.getAllRoomInfo(this.state.day)});
		});
		// OOP my ass
		this.selectDay = this.selectDay.bind(this);
	  }
  render() {
    return (
      <div className="Container">
        <h1 className="App-header">
          Welcome to emptyRooms!
        </h1>
	<div>
		<select name="day" id="day" value={this.state.day} onChange={this.selectDay}>
			// I'm not gonna try to do this shit with a loop again
			// Or maybe, now that I don't seem to be allowed to use 'selected'
			<option value="-1">-1</option>
			<option value="0">0</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
		</select>
	</div>
        <FilterableRoomTable roomTable={this.state.ROOMS}/>
      </div>
    );
  }
selectDay(event) {
		// RIP 4 char long tabs?
		this.setState({day: event.target.value});
		// Could do this in the same setState but this feels cleaner
		// Or no, I should prob. make this into a function, it's completely
		// copy pasted. But functions are annoying to make now
		// (it works a lot better in rooms.js somehow (I think))
		new Rooms().then( (data) => {
			this.setState({ROOMS: data.getAllRoomInfo(this.state.day)});
		});
  }
}
class FilterableRoomTable extends Component {

  render() {
    return (
      <div className="FilterableRoomTable">
        <RoomTable roomTable={this.props.roomTable} />
      </div>  
      );
  }
};
class RoomTable extends Component { 
  render() {
    return (
      <table>
        <tbody>
          <tr className="DescriptionBar">
            <th>Room</th>
            <th className="LeftAlign">
              Available
            </th>    
          </tr>
          {this.props.roomTable.map(function(room,i) {
            return <RoomRow key={i}roomName={room.roomName} roomTime={room.roomTime} />;
          })}
	     </tbody>
      </table>

      );
  }
};

class RoomRow extends Component {
  render() {

    return (
      <tr className="RoomRow">
        <td className="LeftColumn">
          {this.props.roomName}
        </td>
        <td className="RightColumn">
          {this.props.roomTime}
        </td>
      </tr>
    );
  }
}

export default App;
