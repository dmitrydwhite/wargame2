// Import dependencies
import React from 'react';

// Import stylesheet
import './App.css';

// Import image asset and its styling
import enemy_bg from './assets/enemy_bg.svg';
import './assets/enemy_bg.css';

// Import game engine library
import WarGame from './lib/WarCardGame.js';

// Import Sub-Components
import GameDash from './GameDash/GameDash.js';
import HeaderBar from './HeaderBar/HeaderBar.js';
import PlayArea from './PlayArea/PlayArea.js';
import GameInfoArea from './GameInfoArea/GameInfoArea.js';

// Import Firebase
import firebase from './lib/vendor.firebase.js';


/**
 * The central App Component
 */
var App = React.createClass({
  getInitialState() {
    var stateObject;

    this.gameDataPath = '/games';
    this.game = this.startNewGame();
    stateObject = this.game;

    stateObject.displayCards = {
      computer: {},
      user: {},
      extra: 0
    };

    this.game.turns = [];
    this.game.inProgress = true;

    stateObject.waitingForPlay = true;
    stateObject.turnIsTied = false;
    stateObject.turnWinner = '';

    return stateObject;
  },

  /**
   * Resets the game from within the app.
   */
  resetGame() {
    this.setState(this.getInitialState());
  },

  /**
   * Starts new game, used to set initial and subsequent states.
   * @return {Object} The `game` portion of the state object.
   */
  startNewGame() {
    var thisGame = new WarGame();

    var playersObj = thisGame.players;

    var baseLineGameInfo = {
      gameStart: Date.now(),
      players: playersObj,
      deck: thisGame.deck
    };

    this.gameDataPath += '/' + thisGame.gameId.toString() + '/';

    firebase.database()
      .ref(this.gameDataPath + thisGame.gameTurn.toString())
      .set(baseLineGameInfo);

    return thisGame;
  },

  /**
   * Helper method to determine the position of the background indicating the relative strength of the
   * computer (enemy).
   * @param  {String} baseString - The base class for the background.
   * @return {[type]}            - The full class string for the background.
   */
  calculateEnemyClass(baseString) {
    var reserve = this.state.players.computer.reserve.length;
    var discard = this.state.players.computer.discard.length;
    var inPlay = this.game.inProgressTurn ?
      (this.game.inProgressTurn.cardsInPlay.length / 2) :
      0;

    var totalCards = (reserve + discard + inPlay).toString();

    return baseString + totalCards;
  },

  /**
   * The main switchboard of the game. Updates the game engine based on the passed action, and updates
   * the state accordingly.
   * @param  {String} action - A string indicating the action the user just performed by clicking the button.
   */
  gameSwitch(action) {
    var actionMap = {
      play: this.game.playOutCards.bind(this.game),
      resolveTie: this.game.resolveTurn.bind(this.game),
      ackResult: this.game.resolveTurn.bind(this.game)
    };

    var gameObj = actionMap[action]();
    var turnIsFinished = !this.game.inProgressTurn;
    var turnIsTied, turnIsDecided, stateObject;

    if (turnIsFinished) {
      stateObject = {
        waitingForPlay: true,
        displayCards: {
          computer: {},
          user: {},
          extra: 0
        }
      };
    } else {
      turnIsTied = gameObj.result.winner === 'tie';
      turnIsDecided = !turnIsTied;

      stateObject = {
        waitingForPlay: false,
        turnIsTied: turnIsTied,
        needUserAck: turnIsDecided,
        displayCards: {
          computer: gameObj.computer.card,
          user: gameObj.user.card,
          extra: (gameObj.cardsInPlay.length / 2) - 2
        }
      };

      if (turnIsDecided) {
        firebase.database()
          .ref(this.gameDataPath + this.game.gameTurn.toString())
          .set(gameObj);
      }
    }

    stateObject.turnWinner = gameObj.result.winner;      

    this.setState(stateObject);
  },

  /**
   * Render the template
   * @return {JSX}
   */
  render() {
    var enemyHasClass = 'enemy_bg enemy-has-';
    var buttonType;

    if (this.game.gameState !== 0) {
      // buttonType = 'resetGame';
      this.game.inProgress = false;
    } else if (this.state.waitingForPlay) {
      buttonType = 'play';
    } else if (this.state.needUserAck) {
      buttonType = 'ackResult';
    } else if (this.state.turnIsTied) {
      buttonType = 'resolveTie';
    }

    enemyHasClass = this.calculateEnemyClass(enemyHasClass);

    return (
      <div className="App">
        <HeaderBar />
        <div className="play-space">
          <GameDash 
            type="computer" 
            status={this.state.players.computer} 
            display={this.state.displayCards} 
            winner={this.state.turnWinner}
          />
          <GameInfoArea 
            display={!this.game.inProgress}
            restart={this.resetGame}
            gameId={this.game.gameId}
            losers={this.game.losingPlayers}
          />
          <PlayArea display={this.state.displayCards} />
          <GameDash 
            type="user"
            status={this.state.players.user}
            gameSwitch={this.gameSwitch}
            display={this.state.displayCards}
            buttonType={buttonType}
            winner={this.state.turnWinner}
          />
          <img src={enemy_bg} className={enemyHasClass} role="presentation" />
        </div>

        <div className="clearfix"></div>
      </div>
    );
  }
});

export default App;
