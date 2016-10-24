import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Rooms from './rooms.js';

class App extends Component {
	constructor () {
		super()
		this.state = {ROOMS: [{roomName:'E:3318', roomTime:'16:00-17:00'}]}
		new Rooms().then( (data) => {
			this.setState({ROOMS: data.getAllRoomInfo()});
		});
	  }
  render() {
    return (
      <div className="Container">
        <h1 className="App-header">
          Welcome to emptyRooms!
        </h1>
        <FilterableRoomTable roomTable={this.state.ROOMS}/>
      </div>
      
    );
  }

}
class FilterableRoomTable extends Component {

  render() {
    return (
      <div className="FilterableRoomTable">
        
        Available rooms:
        
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
            <th>Available</th>    
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
        <td className="RoomColumn">
          {this.props.roomName}
        </td>
        <td className="TimeColumn">
          {this.props.roomTime}
        </td>
      </tr>
    );
  }
}

export default App;
