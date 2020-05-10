(this["webpackJsonpmilionerzy-react"]=this["webpackJsonpmilionerzy-react"]||[]).push([[0],{10:function(e,t,a){e.exports=a(15)},15:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(8),l=a.n(s),c=(a(7),a(9)),i=a(1),o=a(2),m=a(5),u=a(3),d=a(4),p=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).buttonSelected=function(e){return function(t){n.setState({selectedAnswer:e,isAnswered:!0}),n.props.answerHandler(e),n.props.selectedAnswer()}},n.createMarkup=function(){return{__html:n.state.question}},n.state={isAnswered:!1,selectedAnswer:"",answers:["A","B","C","D"],question:"Witaj ".concat(n.props.player,"rozpocznij gr\u0119 by wylosowa\u0107 pytanie"),answerPrefix:["A","B","C","D"],buttonClass:"",time:"30"},n}return Object(o.a)(a,[{key:"componentDidUpdate",value:function(e){e.answers!==this.props.answers&&this.setState({answers:this.props.answers,question:this.props.question,time:this.props.timer})}},{key:"componentWillReceiveProps",value:function(e){this.setState({time:e.timer})}},{key:"render",value:function(){var e=this,t=this.state.answers,a=this.state.answerPrefix;return r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"question--wrapper bg__dark p-05 font__light-thick"},r.a.createElement("p",{className:"question--header"},"Pytanie"),r.a.createElement("p",{dangerouslySetInnerHTML:this.createMarkup(),className:"question--content"})),r.a.createElement("div",{className:"timer--wrapper bg__dark p-05"},r.a.createElement("span",null,this.state.time)),r.a.createElement("div",{className:"answer--wrapper bg__dark p-05"},t.map((function(t,n){return r.a.createElement("button",{key:n,onClick:e.buttonSelected(n),className:"answer--button ".concat(e.state.isAnswered?"":"answer--hover"," ").concat(n===e.state.selectedAnswer?"checked":"")},r.a.createElement("span",{className:"answer__prefix"},a[n]),t)}))),r.a.createElement("div",{className:"lifebuoy--wrapper bg__dark p-05"},r.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"Extra time"),r.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"50/50"),r.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"Audience chart")))}}]),a}(r.a.Component),h=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={answers:["A","B","C","D"]},n}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"score bg__dark p-1 font__light-thick"},r.a.createElement("h1",null,"Post\u0119py w grze"),r.a.createElement("ol",{reversed:!0},r.a.createElement("li",{className:"milestone"},"1000000"),r.a.createElement("li",null,"500000"),r.a.createElement("li",null,"250000"),r.a.createElement("li",null,"125000"),r.a.createElement("li",null,"75000"),r.a.createElement("li",{className:"milestone"},"40000"),r.a.createElement("li",null,"20000"),r.a.createElement("li",null,"10000"),r.a.createElement("li",null,"5000"),r.a.createElement("li",null,"2000"),r.a.createElement("li",{className:"milestone"},"1000"),r.a.createElement("li",null,"500")))}}]),a}(r.a.Component),w=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).answerHandler=function(e){n.setState({choosenAnswerIdx:e}),e===n.state.corrAnswerIdx?setTimeout((function(){n.correctAnswer(n.state.corrAnswerIdx)}),3e3):setTimeout((function(){n.wrongAnswer(n.state.choosenAnswerIdx,n.state.corrAnswerIdx)}),3e3)},n.selectedAnswer=function(e){for(var t=document.querySelectorAll(".answer--button"),a=0;a<t.length;a++)t[a].disabled=!0,t[a].classList.remove("answer--hover"),n.setState({gamePause:!0})},n.correctAnswer=function(e){document.querySelectorAll(".answer--button")[e].classList.add("correct"),n.scoreboard(n.state.score),n.setState({score:n.state.score-1})},n.wrongAnswer=function(e,t){var a=document.querySelectorAll(".answer--button");a[e].classList.remove("checked"),a[e].classList.add("wrong"),a[t].classList.add("correct"),n.setState({score:11,gameFinished:!0}),n.scoreboard()},n.scoreboard=function(e){var t=document.querySelectorAll("ol li");if(!0===n.state.gameFinished){for(var a=11;a>=0;a--)t[a].style.background="none";alert("Thanks for playing ".concat(n.state.playerName,"! You won ").concat(n.state.currentWinnings,"!"))}else for(var r=11;r>=n.state.score;r--)t[r].style.background="green",n.setState({currentWinnings:t[r].innerText})},n.shuffle=function(e){for(var t=e.length;t;t--){var a=Math.floor(Math.random()*t),n=[e[a],e[t-1]];e[t-1]=n[0],e[a]=n[1]}return e},n.timer=function(){n.state.gamePause||(n.setState({timeLeft:n.state.timeLeft-1}),console.log(n.state.timeLeft)),0===n.state.timeLeft&&(n.setState({gameFinished:!0,gamePause:!0}),alert("Thanks for playing ".concat(n.state.playerName,"! You won ").concat(n.state.currentWinnings,"!")),clearInterval(n.intervalId))},n.gameStart=function(){fetch("https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple").then((function(e){return e.json()})).then((function(e){for(var t=document.querySelectorAll(".answer--button"),a=[e.results[0].correct_answer],r=e.results[0].incorrect_answers,s=n.shuffle([].concat(a,Object(c.a)(r))),l=s.indexOf(a[0]),i=0;i<t.length;i++)t[i].disabled=!1,t[i].classList.add("answer--hover"),t[i].classList.remove("wrong"),t[i].classList.remove("correct"),t[i].classList.remove("checked");n.setState({answers:s,question:e.results[0].question,corrAnswer:a,corrAnswerIdx:l,gameFinished:!1,gamePause:!1,timeLeft:"3"})}),(function(e){n.setState({error:e})})),n.setState({gameStarted:!0}),clearInterval(n.intervalId),n.intervalId=setInterval(n.timer.bind(),1e3)},n.state={playerName:"",question:"",answers:[],gameStarted:!1,gameFinished:!1,gamePause:!0,corrAnswer:[],corrAnswerIdx:"",choosenAnswerIdx:"",score:11,currentWinnings:"0",timeLeft:30},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState({playerName:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"panel bg__dark"},r.a.createElement("p",{className:"nameTitle"},"Twoja nazwa gracza"),r.a.createElement("p",{className:"nameTitle"},this.state.playerName),r.a.createElement("input",{className:"panel--item",type:"text",placeholder:"Enter name...",value:this.state.playerName,onChange:this.handleChange}),r.a.createElement("button",{onClick:this.gameStart,id:"startGame",disabled:!this.state.playerName,className:"panel--button button panel--item"},"Rozpocznij gr\u0119"),r.a.createElement("button",{onClick:this.gameStart,className:"panel--button button panel--item"},"Nast\u0119pne pytanie")),r.a.createElement(p,{timer:this.state.timeLeft,answerHandler:this.answerHandler,selectedAnswer:this.selectedAnswer,answers:this.state.answers,question:this.state.question,player:this.state.playerName}),r.a.createElement(h,null)),r.a.createElement("div",null,r.a.createElement("span",null,this.state.timeLeft)))}}]),a}(r.a.Component);var f=function(){return r.a.createElement(w,null)};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root"))},7:function(e,t,a){}},[[10,1,2]]]);
//# sourceMappingURL=main.35745dd3.chunk.js.map