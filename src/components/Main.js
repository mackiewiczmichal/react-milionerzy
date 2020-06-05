import React from 'react';
import mainTheme from './main_theme.mp3'
import correct_answer from '../sounds/correct_answer.mp3';
import lets_play from '../sounds/lets_play.mp3';


export default class Main extends React.Component {


  componentDidMount(){
    document.querySelector('#mainTheme').volume = 0.05;
  }

  render() {
    return <div className = 'container'>
      <audio id='mainTheme' src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3" loop autoPlay controls></audio>
    </div>
  }
}