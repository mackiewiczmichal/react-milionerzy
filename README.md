Aplikacja jest dostępna pod adresem  [Milionerzy React](https://mackiewiczmichal.github.io/react-milionerzy/).

Autorzy aplikacji:
Michał Mackiewicz(prowadzący),
Krzysztof Kania,
Maciej Broczek

# O aplikacji

Aplikacja "Milionerzy" została stworzona by uhonorować  pamiętną  jej wersję znaną z telewizji. Celem jej jest odtworzenie akcji i działań w owym teleturnieju do czego została wykorzystana nowa technologia, której dopiero się uczyliśmy po to, by szybciej ją przystwoić w praktyczny sposób.

Prosty interfejs graficzny pozwala na wpisanie swojej nazwy, rozpoczęcie gry, wykorzystanie koła ratunkowego oraz rozpoczęcie nowej rundy. Rozpoczynając
nową rundę gracz ma 30 sekund na odpowiedź jeżeli nie zostaje udzielona to gra się kończy i gracz zostaje z ostatnią najwyższą wygraną.

# Założenia alikacji

- [x] Gracz po wpisaniu swojego nicku może rozpocząć grę, następnie ładowane są pytania i uruchamiany jest timer 30-sekundowy. 
- [x] Gracz ma możliwość wykorzystania trzech kół ratunkowych: Dodatkowego czasu, 50/50 oraz podpowiedzi ankietowanych
- [x] Po wybraniu odpowiedzi timer zostaje zatrzymany, pytanie jest sprawdzane. Jeżli odpowiedź jest poprawna zostaje podświetlony zaliczony
próg wygranej i gracz może rozpocząć kolejną rundę.
- [x] Nie zaznaczenie żadnej odpowiedzi i wyczerpanie czasu timera skutkuje przegraną.

# Stack technologiczny
Wykorzystane technologie do stworzenia aplikacji Milionerzy react to: 
* Framework JavaScript – React. Głównym argumentem za wykorzystaniem go jest niski próg trudności co do przetwarzania zapytań z API oraz intuicyjny sposób wstrzykiwania przetwarzanych danych do drzewa DOM.
* Node-sass – Pozwala on na wykorzystywanie mixin, zmiennych oraz zagnieżdżania styli w arkuszach co ułatwia modyfikacje graficzne na stronie.
* API zbudowane Z wykorzystaniem PostgreSQL i Rust – więcej informacji o użytych technologiach można przeczytać tutaj: [Dukumentacja bazy oraz API](https://github.com/KaniaKrzysztof/milionare_api)

# Interfejs graficzny
![Image of gui](https://github.com/mackiewiczmichal/react-milionerzy/blob/master/images_repo/react-gui.png)
### 1. Panel gry
W tej seksji mamy 4 głównej elementy:
* tekst z informacją o wpisanej nazwie użytkownika
* pole do wprowadzania nazwy użytkownika
* przycisk rozpoczynania gry
* przycisk rozpoczęcia następnej rundy jeśli użytkownik odpowiedział poprawnie na pytanie
### 2. Interfejs rozgrywki
Składa się z trzech głównych elementów:
* Pole pyświetlania pytania - pojawia się treść wylosowanego pytania
* Timer - wyświetla czas pozostały do końca tury
* Tabela z 4 możliwymi odpowiedziami - po kliknięciu przycisk się podświetla a następnie system waliduje czy odpowiedź jest prawidłowa.
* Sekcja z kołami ratunkowymi - Dodatkoway czas (+30 sekund), 50/50(podświetla dwie niepawidłowe odpowiedzi), pytanie do publiczności(wyświetla najbardziej prawdopodobną odpowiedź)
# Struktura aplikacji

1. [Plik zależności](#Plik-zależności)
2. [Struktura danych](#Struktura-danych)
3. [Komponenty aplikacji](#Komponenty-aplikacji)
    1. [App.js](#app.js)
    2. [Game.js](##Game.js)
    3. [GameContent.js](##GameContent.js)
    4. [Score.js](##Score.js)

# Plik zależności


```javascript
{
  "homepage": "https://mackiewiczmichal.github.io/react-milionerzy",
  "name": "milionerzy-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "node-sass": "^4.13.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "gh-pages": "^2.2.0"
  }
}

```
# Struktura danych
Struktura API z pytaniami została stworzona by móc manipulować ich trudnością oraz możliwością łatwego wyekstraktowania odpowiedzi prawidłowej.
Konsumując nasze API mamy prosty schemat pobierania danych po ptrzymaniu tablicy z danymi `results` możemy odczytywac informacje iterując po jej indexach.
- `category` - informuje nas jakiej dziedziny będzie wykorzystane pytanie
- `type` - pytanie ma wiele 4 możliwe odpowiedzi
- `difficulty` - trudność pytania
- `question` - treść pytania
- `correct_answer` - poprawna odpowiedź
- `incorrect_answers` - tablica z niepoprawnymi odpowiedziami

```javascript
{"response_code":0,
    "results":[
        {"category":"Science: Computers",
        "type":"multiple",
        "difficulty":"easy",
        "question":"On Twitter, what is the character limit for a Tweet?",
        "correct_answer":"140",
        "incorrect_answers":["120","160","100"]
        }
    ]
}

```
# Komponenty aplikacji
Aplikacja została podzielona na komponenty w celu łatwiejszego jej zarządzania. Komponene sklada się z trzech głównych elementów: 
Nagłówka z dołączeniami, które chcemy zawrzeć w naszej aplikacji:
```javascript
import React from 'react';
import GameContent from './GameContent.js';
import Score from './Score.js';
```
Inicjacji klasy wraz ze stanem oraz funkcjami:
```javascript
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }}
```
Funkcji render w której zwracamy nasze stany, funkcje, elementy HTML  oraz zagnieżdżamy zaimportowane elementy z nagłówka:
```javascript
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
```
W każdym komponencie mamy zadeklarowany jego stan, z którego pobieramy dane by móc renderować je w funkcji generującej DOM.
  # 1.  # App.js
  Jest to plik, w którym znajduje się wyłącznie zestawienie naszego drzewa komponentów. W naszym przypadku jest to wyłącznie komponent `<Game/>`.

  Z tego pliku React renderuje wszystko to co zostanie umieszczone w `App.js`.
  ```javascript
  function App() {
    return (
      <Game/>
    );
  }
  ```
  # 2. Game.js
  Nasz główny plik, w którym przechowujemy bieżący stan całej aplikacji oraz funkcje.

  ### Nagłówek z elementami zaimportowanymi do pliku Game.js

  ```javascript
import React from 'react';
import GameContent from './GameContent.js';
import Score from './Score.js';
  ```

  ### Stan pliku Game.js
  ```javascript
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
  ```
  - playerName`[type:string]` - Przechowuje nazwe gracza
  - question`[type:string]` - Prechowuje pobrane z API pytanie
  - answers`[type:array]` - Tablica z odpowiedziami pobranymi z API
  - gameStarted`[type:boolean]` - Przechowuje wartość `false/true` o tym czy gra została rozpoczęta
  - gameStarted`[type:boolean]` - Przechowuje wartość `false/true` o tym czy gra została zakończona
  - gamePaused`[type:boolean]` - Przechowuje wartość `false/true` o tym czy gra została zatrzymana
  - corrAnswer`[type:array]` - Przechowuje treść prawidłowej odpowiedzi
  - corrAnswerIdx`[type:int]` - Przechowuje index prawidłowej odpowiedzi
  - choosenAnswerIdx`[type:int]` - Przechowuje index wybranej przez gracza odpowiedzi
  - score `[type:int]` - Ilość progów wygranych 
  - currentWinnings`[type:int]` - Obecja wysokość wygranych przez gracza
  - timeLeft`[type:int]` - Czas jaki pozostał do zakończenia rundy
  - usedExtraTime`[type:boolean]` - Informacja czy zostało użyte koło ratunkowe `Extra Time`
  - usedFiftyFifty`[type:boolean]` - Informacja czy zostało użyte koło ratunkowe `Fifty Fifty`
  - usedAudience`[type:boolean]` - Informacja czy zostało użyte koło ratunkowe `Audience Chart`

### Funkcje wykorzystywane w aplikacji

### `handleChange()`
```javascript
  //Umożliwienie wpisywania nazwy gracza
  handleChange(event) {
    this.setState({playerName: event.target.value});
  }
```
Funkcja ta przypisuje wartość wprowadzoną do pola nazwa gracza do stanu aplikacji `playerName`

### `answerHandler()`
```javascript
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
```
Funkcja ta jest uchwytem do kontrolowania akcji udzielenia odpowiedzi
### `selectedAnswer()`
```javascript
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
```
Funkcja ta ustawia stan gry na `pause` wyłącza możliwość klikania w przyciski oraz usuwa odpowiednie style przycisków
### `correctAnswer()`
```javascript
//Rekcja na dobrą odpowiedź
correctAnswer = index =>{
  let allAnswers = document.querySelectorAll(".answer--button");
  allAnswers[index].classList.add('correct');
  this.scoreboard(this.state.score);
  this.setState({
    score: this.state.score-1
  })
  
}
```
Funkcja ta jest reakcją na poprawną odpowiedź wybraną przez użytkownika, aktualizuje wyświetlanie punktacji w tabeli
### `wrongAnswer()`
```javascript
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

```
Funkcja ta jest reakcją na niepoprawną odpowiedź wybraną przez użytkownika zmienia stan gry na zakończony, ustawia stan podstawowego wyniku i czyści stylowanie tablicy

### `scoreboard ()`
```javascript
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
```
Funkcja ta aktualizuje tabelę z punktacją podświetlając obecną wielkość wygranej i umieszczanie jej w `currentWinnings` w zależności od stanu `score`
### `shuffle()`
```javascript
//Przemieszanie pytań pobranych z API
shuffle = arr => {
  for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
    return arr;
}
```
Funkcja mająca na celu przetasowanie pytań pobranych z API
### `timer()`
```javascript
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
```
Jest to funkcja obliczająca ilość pozostałego czasu od nadanego stanu aplikacji, sprawdza czy czas się skończył, jeżeli tak to gra zostaje zakończona
### `usedExtraTime()`
```javascript
//Funkcja obsługiwania koła ratunkowego Extra Time
usedExtraTime = () =>{
  if(this.state.usedExtraTime === false && this.state.gameStarted === true){
    this.setState({
      usedExtraTime:true,
      timeLeft: this.state.timeLeft+=30
    });
  }
}
```
Funkcja ta jest uchwytem koła ratunkowego Extra time, który dodaje 30 sekund do czasu pozostałego na oddanie pytania
### `usedFiftyFifty()`
```javascript
//Funkcja obsługiwania koła ratunkowego extra 
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
    };
  }
}
```
Funkcja ta jest uchwytem koła ratunkowego Fifty Fifty podświetla dwie nieprawidłowe odpowiedzi
### `gameStart()`
```javascript
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
```
Jest to funkcja rozpoczynająca całą grę, pobiera ona pytanie z API, ustawia podstawowe stany głównego komponentu, uruchamia timer, resetuje możliwość 
używania kół ratunkowych jeżeli argument przekazany funkcji `round` nie równia się `next-round`

### `render() -- class Game w pliku Game.js`
```javascript
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
```
W `render()` Zwracamy element JSX czyli HTML przeplatanego z javascriptem. To tutaj umieszczamy zaimportowane komponenty naszej aplikacji do których możemy przekazywać dane ze stanu głównej aplikacji
Dane przekazywane do komponentów dzielą się na:
* props - wartość read only tylko do odczytu i wyświetlenia w komponencie `timer={this.state.timeLeft}`
* callbacks - funkcje przekazywane które wykorzystane w komonencie mogą zmieniać stan aplikacji `ExtraTime={this.usedExtraTime}`

# 3. GameContent.js
  Plik, w którym znajduje się kod odpowiedzialny za wyświetlanie pytań, przycisków odpowiedzi 

  ### Nagłówek z elementami zaimportowanymi do pliku Game.js

  ```javascript
import React from 'react';
  ```

  ### Stan pliku GameContent.js

    ```javascript
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
  ```

  - isAnswered`[type:boolean]` - Przechowuje informacje o tym czy została udzielona odpowiedź
  - selectedAnswer`[type:string]` - Index wybranej odpowiedzi
  - answers`[type:array]` - Tablica z odpowiedziami(inicjują się z wartościami ['A','B','C','D'])
  - question`[type:string]` - Przechowuje treść pytania
  - answerPrefix`[type:array]` - Tablica ze znacznikami odpowiedzi 
  - time`[type:int]` - Czas pozostały do końca rundy

  ### Funkcje wykorzystywane w pliku GameContent.js

### `componentDidUpdate()`
```javascript
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
```
Funkcja ta sprawdza czy stan komponentu się zmienił a jeżeli tak to ustawia nowe wartości stanu w miejsce starych.

### `componentWillReceiveProps()`
```javascript
  //Sprawdzenie czy komponent otrzymuje nowe propy od głównego komponentu
  componentWillReceiveProps(nextProps){
      this.setState({
          time:nextProps.timer
      })
  }
```

### `handleChange()`
```javascript
  //Ustawia stan aplikacji kiedy odpowiedź została udzielona oraz wybrana odpowiedź
  buttonSelected = selectedAnswer => ev => {
    this.setState({ 
        selectedAnswer:selectedAnswer,
        isAnswered:true
    });
    this.props.answerHandler(selectedAnswer);
    this.props.selectedAnswer();
}
```
Funkcja ta jest uchwytem mającym na celu sprawdzenie wybranej odpowiedzi i przekazanie jej wartości do callbacku do głównej aplikacji.

### `render() -- class GameContent w pliku GameContent.js`
```javascript
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
```

W tej funkcji wykorzystujemy otrzymane propy i callbacki z głównego komponentu
* `onClick ={this.props.FiftyFifty}` - po kliknięciu wywołujemy funkcję zadeklarowaną w głównym komponencie zmieniając jego stan

# 4. Score.js
  Plik w którym znajduje się kod odpowiedzialny za zmianę wyświetlania antualnego wyniku gracza

```javascript
import React from 'react';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: ['A', 'B', 'C', 'D']
    }
  }

  render() {
            return(
            <div className="score bg__dark p-1 font__light-thick" >
                <h1>Postępy w grze</h1>
                <ol reversed>
                    <li className="milestone">1000000</li>
                    <li>500000</li>
                    <li>250000</li>
                    <li>125000</li>
                    <li>75000</li>
                    <li className="milestone">40000</li>
                    <li>20000</li>
                    <li>10000</li>
                    <li>5000</li>
                    <li>2000</li>
                    <li className="milestone">1000</li>
                    <li>500</li>
                </ol>
            </div>
            );
        };
    }
```



  Ten komponent został utworzony tylko ze względu na oddzielenie części jego kodu by łatwiej zarządzać kodem głównej aplikacji
