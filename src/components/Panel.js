
import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted:this.props.gameStarted
    }
  }
  gameStart(){
    this.setState({
      gameStarted:true
    })
  }
  render() {
            return(
            <div className="panel bg__dark">
                <input className="panel--item" type="text" placeholder="Enter name..."></input>
                <button onClick={this.gameStart} id="startGame" className="panel--button button panel--item">Rozpocznij grę</button>
                <button className="panel--button button panel--item">Następne pytanie</button>
            </div>
            );
        };
    }