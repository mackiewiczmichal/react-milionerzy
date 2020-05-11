Aplikacja jest dostępna pod adresem  [Milionerzy React](https://mackiewiczmichal.github.io/react-milionerzy/).

# Założenia alikacji

- [x] Gracz po wpisaniu swojego nicku może rozpocząć grę, następnie ładowane są pytania i uruchamiany jest timer 30-sekundowy. 
- [x] Gracz ma możliwość wykorzystania trzech kół ratunkowych: Dodatkowego czasu, 50/50 oraz podpowiedzi ankietowanych
- [x] Po wybraniu odpowiedzi timer zostaje zatrzymany, pytanie jest sprawdzane. Jeżli odpowiedź jest poprawna zostaje podświetlony zaliczony
próg wygranej i gracz może rozpocząć kolejną rundę.
- [x] Nie zaznaczenie żadnej odpowiedzi i wyczerpanie czasu timera skutkuje przegraną.
- [ ] Wynik zostaje zapisany w zewnętrznej bazie danych

# Stack technologiczny
Wykorzystane technologie do stworzenia aplikacji Milionerzy react to: 
* React DOM
* React Scripts
* Node-sass
* API zbudowane Z wykorzystaniem PostgreSQL i Rust

# Struktura aplikacji

1. [Plik zależności](#Plik-zależności)
2. [Struktura danych](#Struktura-danych)
3. [Komponenty aplikacji](#Komponenty-aplikacji)
    1. [App.js](#App.js)
    2. [Game.js](#Game.js)
    3. [GameContent.js](#GameContent.js)
    4. [Score.js](#Score.js)

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
Aplikacja została podzielona na komponenty w celu łatwiejszego jej zarządzania. W każdym komponencie mamy zadeklarowany stan komponentu, z którego pobieramy dane by móc renderować je w funkcji generującej DOM.
  ## 1.  App.js
  Jest to plik, w którym znajduje się wyłącznie zestawienie naszego drzewa komponentów. W naszym przypadku jest to wyłącznie komponent `<Game/>`.

  Z tego pliku React renderuje wszystko to co zostanie umieszczone w `App.js`.
  ```javascript
  function App() {
    return (
      <Game/>
    );
  }
  ```
  ## 2. Game.js
  Nasz główny plik, w którym przechowujemy bieżący stan całej aplikacji oraz funkcje.

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
