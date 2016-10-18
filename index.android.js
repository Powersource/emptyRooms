/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class emptyRooms extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to emptyRooms!
        </Text>
        <FilterableRoomTable roomTable = {ROOMS}/>
      </View>
    );
  }
};

class FilterableRoomTable extends Component {
  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          Available rooms:
        </Text>
        <RoomTable roomTable={this.props.roomTable} />
      </View>  
      );
  }
};
class RoomTable extends Component {
  /* var roomRows = this.props.roomTable.map(function(room) {
    return (<RoomRow roomName = {room.roomName} roomTime = {room.roomTime} />);
  }); */

  
  render() {
    var roomRows = this.props.roomTable.map(function(room) {
      <RoomRow roomName={room.roomName} roomTime={room.roomTime} />;
    });

    return (
      <View>
        <View style={styles.descriptionBar}>
          <Text>
            Room
          </Text>
          <Text>
            Available   
          </Text>    
        </View>
        <View style={styles.roomTable}>
          {/*<RoomRow roomName='E:3316' roomTime='13:00-15:00' /> */}
          {roomRows}
        </View>
      </View>

      );
  }
};
class RoomRow extends Component {
  render() {
    return (
      <View style={styles.roomRow}>
        <Text>{this.props.roomName}</Text>
        <Text>{this.props.roomTime}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  descriptionBar: {
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  roomTable: {

  },
  roomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

var ROOMS = [
{roomName:'E:3316', roomTime:'08:00-17:00'},
{roomName:'E:3317', roomTime:'09:00-17:00'},
{roomName:'E:3318', roomTime:'10:00-17:00'}];

AppRegistry.registerComponent('emptyRooms', () => emptyRooms);
