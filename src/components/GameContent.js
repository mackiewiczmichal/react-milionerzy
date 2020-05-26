import React from 'react';

export default class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAnswered:false,
        selectedAnswer:'',
        answers:['A','B','C','D'],
        question:`Witaj ${this.props.player}rozpocznij grę by wylosować pytanie`,
        answerPrefix:['A','B','C','D'],
        buttonClass: "",
        time:"30"
    }
  }
  //Sprawdzenie czy komponent po przeładowaniu się zmienił
  componentDidUpdate(prevProps) {
    if (prevProps.answers !== this.props.answers) {
      this.setState({
          answers:this.props.answers,
          question:this.props.question,
          time:this.props.timer
      });
    }
  }
  //Sprawdzenie czy komponent otrzymuje nowe propy od głównego komponentu
  componentWillReceiveProps(nextProps){
      this.setState({
          time:nextProps.timer
      })
  }
  //Ustawia stan aplikacji kiedy odpowiedź została udzielona oraz wybrana odpowiedź
  buttonSelected = selectedAnswer => ev => {
    this.setState({ 
        selectedAnswer:selectedAnswer,
        isAnswered:true
    });
    this.props.answerHandler(selectedAnswer);
    this.props.selectedAnswer();
}
// Wpisywanie treści pytania z uuwzględnieniem znaków specjalnych
createMarkup = () => {
    return {__html: this.state.question};
    }

  render() {
      const answerAll = this.state.answers;
      const answerPrefix = this.state.answerPrefix;
            return(
            <div className="game">
                <div className="question--wrapper bg__dark p-05 font__light-thick">
                    <p className="question--header">
                        Pytanie
                    </p>
                    <p dangerouslySetInnerHTML={this.createMarkup()} className="question--content"/>
                </div>
                <div className="timer--wrapper bg__dark p-05">
                    <span>{this.state.time}</span>
                </div>
                <div className="answer--wrapper bg__dark p-05">
                {answerAll.map((value, index) => {
                    return <button 
                    key={index} 
                    onClick={this.buttonSelected(index) } 
                    className={`answer--button ${this.state.isAnswered ? '' : 'answer--hover'} ${ index === this.state.selectedAnswer ? 'checked' : ''}`}
                    >
                    <span className="answer__prefix">{answerPrefix[index]}</span>{value}</button>
                })}
                </div>
                
                <div className="lifebuoy--wrapper bg__dark p-05">
                    <button onClick ={this.props.ExtraTime} className="lifebuoy--item font__light-thick" disabled={this.props.propExtraTime === true ? true : false}>Extra time</button>
                    <button onClick ={this.props.FiftyFifty} className="lifebuoy--item font__light-thick">50/50</button>
                    <button onClick ={this.props.Audience} className="lifebuoy--item font__light-thick">Audience chart</button>
                </div>
            </div>
            );
        };
    }