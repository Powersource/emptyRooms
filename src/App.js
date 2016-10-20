import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Rooms from './rooms.js';

let ROOMS = [];
new Rooms().then( (data) => {
	ROOMS = data.getAllRoomInfo();
	//ROOMS = data.getDemoInfo();
	console.log(ROOMS);
});

class App extends Component {
  render() {
    return (
      <div>
        <h1 class="App-header">
          Welcome to emptyRooms!
        </h1>
        <FilterableRoomTable roomTable={ROOMS}/>
      </div>
      
    );
  }

}
class FilterableRoomTable extends Component {
  render() {
    return (
      <div class="FilterableRoomTable">
        
        Available rooms:
        
        <RoomTable roomTable={this.props.roomTable} />
      </div>  
      );
  }
};
class RoomTable extends Component {
  /* var roomRows = this.props.roomTable.map(function(room) {
    return (<RoomRow roomName = {room.roomName} roomTime = {room.roomTime} />);
  }); */

  
  render() {
    return (
      <table>
        <tr className="DescriptionBar">
          <th>Room</th>
          <th>Time Available</th>    
        </tr>
        <tr className="RoomTable">
          {this.props.roomTable.map(function(room,i) {
            return <RoomRow key={i}roomName={room.roomName} roomTime={room.roomTime} />;
          })}
        </tr>
      </table>

      );
  }
};

class RoomRow extends Component {
  render() {

    return (
      <tr className="RoomRow">
        <td class="RoomColumn">
          {this.props.roomName}
        </td>
        <td classname="TimeColumn">
          {this.props.roomTime}
        </td>
      </tr>
    );
  }
}


export default App;
