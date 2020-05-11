
import React from 'react';
import GameContent from './GameContent.js';
import Score from './Score.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName:'',
      question:'',
      answers:[],
      gameStarted:false,
      gameFinished:false,
      gamePause:true,
      corrAnswer:[],
      corrAnswerIdx:'',
      choosenAnswerIdx:'',
      score:11,
      currentWinnings:'0',
      timeLeft:30,
      usedExtraTime:false,
      usedFiftyFifty:false,
      usedAudience:false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  //Umożliwienie wpisywania nazwy gracza
  handleChange(event) {
    this.setState({playerName: event.target.value});
  }
  //Akcja udzielania odpowiedzi
  answerHandler = index =>{
    this.setState({
      choosenAnswerIdx:index
    });
    if(index === this.state.corrAnswerIdx){
      setTimeout(() => {this.correctAnswer(this.state.corrAnswerIdx);}, 3000);
      
    }
    else{
      setTimeout(() => {this.wrongAnswer(this.state.choosenAnswerIdx,this.state.corrAnswerIdx);}, 3000);
    }
  }
//Reakcja wybranie odpowiedzi
selectedAnswer = () =>{
  let allAnswers = document.querySelectorAll(".answer--button");
  for(let i = 0; i<allAnswers.length;i++){
    allAnswers[i].disabled = true;
    allAnswers[i].classList.remove('answer--hover');
    this.setState({
      gamePause:true
    })
  }

}
//Rekcja na dobrą odpowiedź
correctAnswer = index =>{
  let allAnswers = document.querySelectorAll(".answer--button");
  allAnswers[index].classList.add('correct');
  this.scoreboard(this.state.score);
  this.setState({
    score: this.state.score-1
  })
  
}
//Reakcja na zlą odpowiedź
wrongAnswer = (choosen, correct) => {
  let allAnswers = document.querySelectorAll(".answer--button");
  allAnswers[choosen].classList.remove('checked');
  allAnswers[choosen].classList.add('wrong');
  allAnswers[correct].classList.add('correct');
  this.setState({
    score: 11,
    gameFinished:true
  });
  this.scoreboard();
}
//Reakcja na zmianę wyniku
scoreboard = scoreIdx => {
  let scoreList = document.querySelectorAll("ol li");
  if(this.state.gameFinished === true){
    for (let i = 11;i>=0; i--){
      scoreList[i].style.background = "none";
    }
    alert(`Thanks for playing ${this.state.playerName}! You won ${this.state.currentWinnings}!`);
  }
  else{
    for (let i = 11;i>=this.state.score; i--){
      scoreList[i].style.background = "green";
      this.setState({
        currentWinnings: scoreList[i].innerText
      });
    }
  }
}
//Przemieszanie pytań pobranych z API
shuffle = arr => {
  for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
    return arr;
}
//Licznik pozostałego czasu na udzielenie odpowiedzi
timer = () => {
  if(!this.state.gamePause) {
    this.setState({
        timeLeft: this.state.timeLeft - 1
    });
    console.log(this.state.timeLeft);
  }
  if (this.state.timeLeft === 0){
      this.setState({
        gameFinished:true,
        gamePause:true
      });
      alert(`Thanks for playing ${this.state.playerName}! You won ${this.state.currentWinnings}!`);
      clearInterval(this.intervalId);
  }
}
//Funkcja obsługiwania kół ratunkowych
usedExtraTime = () =>{
  if(this.state.usedExtraTime === false && this.state.gameStarted === true){
    this.setState({
      usedExtraTime:true,
      timeLeft: this.state.timeLeft+=30
    });
  }
}
usedFiftyFifty = () =>{
  if(this.state.usedFiftyFifty === false && this.state.gameStarted === true){
    this.setState({
      usedFiftyFifty:true
    });
    let answerArray = document.querySelectorAll(".answer--button");
    var iterator = 0;
    for(var i=0; i<answerArray.length; i++){
      if(i !== this.state.corrAnswerIdx && iterator<=1){
        answerArray[i].classList.add('wrong');
        iterator +=1;
      }
      console.log("adam");
    };
  }
}
usedAudience = () =>{
  this.setState({
    usedAudience:true
  });
}
//Główna funkcja rozpoczynająca grę
  gameStart = (round) => {
    fetch("https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(
      (result) => {
        let allAnswers = document.querySelectorAll(".answer--button");
        let corrAnswer = [result.results[0].correct_answer];
        let incorrAnswer = result.results[0].incorrect_answers;
        let answersAll = this.shuffle([...corrAnswer, ...incorrAnswer]);
        const idxCorrAns = answersAll.indexOf(corrAnswer[0]);
        //Czyszczenie dodanych styli do React DOMu
        for(let i = 0; i<allAnswers.length;i++){
          allAnswers[i].disabled = false;
          allAnswers[i].classList.add('answer--hover');
          allAnswers[i].classList.remove('wrong');
          allAnswers[i].classList.remove('correct');
          allAnswers[i].classList.remove('checked');
        }
        //Ustawienie własności początkowych
        this.setState({
          answers: answersAll,
          question:result.results[0].question,
          corrAnswer:corrAnswer,
          corrAnswerIdx:idxCorrAns,
          gameFinished:false,
          gamePause:false,
          timeLeft:'30'
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
    if(round !== 'next-round'){
      this.setState({
        currentWinnings:'0',
        usedExtraTime:false,
        usedFiftyFifty:false,
        usedAudience:false
      })
    }
    this.setState({
      gameStarted:true
    });
    //Wyczyszczenie i ustawienie timera
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.timer.bind(), 1000);
  }

  render() {
            return <div className="wrapper">
        <div className="container">
        <div className="panel bg__dark">
                <p className="nameTitle">Twoja nazwa gracza</p>
                <p className="nameTitle">{this.state.playerName}</p>
                <input className="panel--item" type="text" placeholder="Enter name..." value={this.state.playerName} onChange={this.handleChange}></input>
                <button onClick={this.gameStart} id="startGame" disabled={!this.state.playerName} className="panel--button button panel--item">Rozpocznij grę</button>
                <button onClick={() => this.gameStart('next-round')} className="panel--button button panel--item">Następne pytanie</button>
            </div>
            <GameContent 
            timer={this.state.timeLeft}
            answerHandler={this.answerHandler}
            selectedAnswer={this.selectedAnswer}
            ExtraTime={this.usedExtraTime}
            FiftyFifty={this.usedFiftyFifty}
            Audience={this.usedAudience}
            propExtraValue={this.state.ExtraTime}
            propFiftyFifty={this.state.FiftyFifty}
            propAudience={this.state.Audience}
            answers={this.state.answers} 
            question={this.state.question}
            player={this.state.playerName}/>
            <Score/>
        </div>
        <div>
    </div>
    </div>

        };
    }