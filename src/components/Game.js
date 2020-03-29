
import React from 'react';
import GameContent from './GameContent.js';
import Score from './Score.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      answers:[],
      gameStarted:false
    }
  }


  gameStart = () => {
    fetch("https://api.myjson.com/bins/1hblb8")
    .then(res => res.json())
    .then(
      (result) => {
        let corrAnswer = result.results[0].correct_answer;
        let incorrAnswer = result.results[0].incorrect_answers;
        let answersAll = [...corrAnswer, ...incorrAnswer];
        this.setState({
          answers: answersAll,
          question:result.results[0].question
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
    this.setState({
      gameStarted:true
    })
  }


  render() {
            return <div className="wrapper">
        <div className="container">
        <div className="panel bg__dark">
                <input className="panel--item" type="text" placeholder="Enter name..."></input>
                <button onClick={this.gameStart} id="startGame" className="panel--button button panel--item">Rozpocznij grę</button>
                <button className="panel--button button panel--item">Następne pytanie</button>
            </div>
            <GameContent answers={this.state.answers} question={this.state.question}/>
            <Score/>
        </div>
    </div>
        };
    }