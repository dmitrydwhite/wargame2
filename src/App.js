// Import dependencies
import React from 'react';

// Import stylesheet
import './App.css';

// Import image asset
import enemy_bg from '../assets/enemy_bg.svg';

// Import game engine library
import WarGame from './lib/WarCardGame.js';

// Import Components
import GameDash from './GameDash/GameDash.js';
import HeaderBar from './HeaderBar/HeaderBar.js';
import PlayArea from './PlayArea/PlayArea.js';


var App = React.createClass({
  getInitialState() {
    var stateObject;

    this.game = this.startNewGame();
    stateObject = this.game;

    stateObject.displayCards = {
      computer: {},
      user: {},
      extra: 0
    };

    this.game.turns = [];

    stateObject.waitingForPlay = true;
    stateObject.turnIsTied = false;
    stateObject.turnWinner = '';

    return stateObject;
  },

  startNewGame() {
    return new WarGame();
  },

  calculateEnemyClass(baseString) {
    var reserve = this.state.players.computer.reserve.length;
    var discard = this.state.players.computer.discard.length;
    var inPlay = this.game.inProgressTurn ?
      (this.game.inProgressTurn.cardsInPlay.length / 2) :
      0;

    var totalCards = (reserve + discard + inPlay).toString();

    return baseString + totalCards;
  },

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
        stateObject.turnWinner = gameObj.result.winner;      
      }
    }

    this.setState(stateObject);
  },

  render() {
    var buttonType;
    var enemyHasClass = 'enemy_bg enemy-has-';


    if (this.state.waitingForPlay) {
      buttonType = 'play';
    } else if (this.state.needUserAck) {
      buttonType = 'ackResult';
    } else if (this.state.turnIsTied) {
      buttonType = 'resolveTie';
    } else if (this.game.gameState === 0) {
      buttonType = 'resetGame';
    }

    enemyHasClass = this.calculateEnemyClass.call(this, enemyHasClass);

    return (
      <div className="App row-12">
        <HeaderBar />
        <div className=" play-space">
          <GameDash type="computer" status={this.state.players.computer} display={this.state.displayCards} />
          <PlayArea display={this.state.displayCards} />
          <GameDash 
            type="user"
            status={this.state.players.user}
            gameSwitch={this.gameSwitch}
            display={this.state.displayCards}
            buttonType={buttonType}
            winner={this.state.turnWinner}
          />
          <img src={enemy_bg} className={enemyHasClass} ref="enemyBg" role="presentation" />
        </div>

        <div className="clearfix"></div>
      </div>
    );
  }
});

export default App;
