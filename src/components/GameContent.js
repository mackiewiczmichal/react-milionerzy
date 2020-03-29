import React from 'react';

export default class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAnswered:false,
        selectedAnswer:'',
        answers:['A','B','C','D'],
        question:"Witaj rozpocznij grę by wylosować pytanie",
        answerPrefix:['A','B','C','D'],
        buttonClass: "",
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.answers !== this.props.answers) {
      this.setState({
          answers:this.props.answers,
          question:this.props.question
      });
    }
  }
  buttonSelected = selectedAnswer => ev => {
    this.setState({ 
        selectedAnswer:selectedAnswer,
        isAnswered:true
    })
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
                    <p className="question--content">
                        {this.state.question}
                    </p>
                </div>
                <div className="answer--wrapper bg__dark p-05">
                {answerAll.map((value, index) => {
                    return <button 
                    key={index} 
                    onClick={this.buttonSelected(index)} 
                    className={`answer--button ${this.state.isAnswered ? '' : 'answer--hover'} ${ index === this.state.selectedAnswer ? 'checked' : ''}`}
                    disabled={this.state.isAnswered ? true : false}>
                    <span className="answer__prefix">{answerPrefix[index]}</span>{value}</button>
                })}
                </div>
                
                <div className="lifebuoy--wrapper bg__dark p-05">
                    <button className="lifebuoy--item font__light-thick">Extra time</button>
                    <button className="lifebuoy--item font__light-thick">50/50</button>
                    <button className="lifebuoy--item font__light-thick">Audience chart</button>
                </div>
            </div>
            );
        };
    }