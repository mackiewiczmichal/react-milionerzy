(this["webpackJsonpmilionerzy-react"]=this["webpackJsonpmilionerzy-react"]||[]).push([[0],{14:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(8),l=a.n(r),c=(a(7),a(5)),i=a(1),o=a(2),u=a(3),m=a(4),p=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).buttonSelected=function(e){return function(t){n.setState({selectedAnswer:e,isAnswered:!0})}},n.state={isAnswered:!1,selectedAnswer:"",answers:["A","B","C","D"],question:"Witaj rozpocznij gr\u0119 by wylosowa\u0107 pytanie",answerPrefix:["A","B","C","D"],buttonClass:""},n}return Object(o.a)(a,[{key:"componentDidUpdate",value:function(e){e.answers!==this.props.answers&&this.setState({answers:this.props.answers,question:this.props.question})}},{key:"render",value:function(){var e=this,t=this.state.answers,a=this.state.answerPrefix;return s.a.createElement("div",{className:"game"},s.a.createElement("div",{className:"question--wrapper bg__dark p-05 font__light-thick"},s.a.createElement("p",{className:"question--header"},"Pytanie"),s.a.createElement("p",{className:"question--content"},this.state.question)),s.a.createElement("div",{className:"answer--wrapper bg__dark p-05"},t.map((function(t,n){return s.a.createElement("button",{key:n,onClick:e.buttonSelected(n),className:"answer--button ".concat(e.state.isAnswered?"":"answer--hover"," ").concat(n===e.state.selectedAnswer?"checked":""),disabled:!!e.state.isAnswered},s.a.createElement("span",{className:"answer__prefix"},a[n]),t)}))),s.a.createElement("div",{className:"lifebuoy--wrapper bg__dark p-05"},s.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"Extra time"),s.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"50/50"),s.a.createElement("button",{className:"lifebuoy--item font__light-thick"},"Audience chart")))}}]),a}(s.a.Component),b=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={answers:["A","B","C","D"]},n}return Object(o.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"score bg__dark p-1 font__light-thick"},s.a.createElement("h1",null,"Post\u0119py w grze"),s.a.createElement("ol",{reversed:!0},s.a.createElement("li",{className:"milestone"},"1000000"),s.a.createElement("li",null,"500000"),s.a.createElement("li",null,"250000"),s.a.createElement("li",null,"125000"),s.a.createElement("li",null,"75000"),s.a.createElement("li",{className:"milestone"},"40000"),s.a.createElement("li",null,"20000"),s.a.createElement("li",null,"10000"),s.a.createElement("li",null,"5000"),s.a.createElement("li",null,"2000"),s.a.createElement("li",{className:"milestone"},"1000"),s.a.createElement("li",null,"500")))}}]),a}(s.a.Component),d=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).gameStart=function(){fetch("https://api.myjson.com/bins/1hblb8").then((function(e){return e.json()})).then((function(e){var t=e.results[0].correct_answer,a=e.results[0].incorrect_answers,s=[].concat(Object(c.a)(t),Object(c.a)(a));n.setState({answers:s,question:e.results[0].question})}),(function(e){n.setState({error:e})})),n.setState({gameStarted:!0})},n.state={question:"",answers:[],gameStarted:!1},n}return Object(o.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"panel bg__dark"},s.a.createElement("input",{className:"panel--item",type:"text",placeholder:"Enter name..."}),s.a.createElement("button",{onClick:this.gameStart,id:"startGame",className:"panel--button button panel--item"},"Rozpocznij gr\u0119"),s.a.createElement("button",{className:"panel--button button panel--item"},"Nast\u0119pne pytanie")),s.a.createElement(p,{answers:this.state.answers,question:this.state.question}),s.a.createElement(b,null)))}}]),a}(s.a.Component);var h=function(){return s.a.createElement(d,null)};l.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(h,null)),document.getElementById("root"))},7:function(e,t,a){},9:function(e,t,a){e.exports=a(14)}},[[9,1,2]]]);
//# sourceMappingURL=main.203a0f43.chunk.js.map