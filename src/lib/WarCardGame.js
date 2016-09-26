import uuid from 'node-uuid';
import Deck from './DeckOfCards';


/**
 * The War Card Game Class
 */
class WarGame {
  /**
   * Creates a WarGame class
   * @return {WarGame} - An instance of the WarGame Class
   */
  constructor() {
    this.deck = new Deck().unWrap().shuffle();
    var len = this.deck.deck.length;

    this.TIE_CARDS_FACEDOWN = 3;

    this.gameState = 0;
    this.gameTurn = 0;
    this.gameId = uuid.v1();

    this.players = {
      user: {
        reserve: this.deck.deal(Math.floor(len/2)),
        discard: []
      },
      computer: {
        reserve: this.deck.deal(Math.floor(len/2)),
        discard: []
      }
    }

    this.losingPlayers = [];
  }

  /**
   * A method to play out cards, either at the beginning of a turn or as a result of a tie.
   * @param  {[Number]} cards - The number of face-down cards to include in this turn.
   * @return {Object} - An object describing the state of the turn.
   */
  playOutCards(cards) {
    if (!cards) {
      console.log('beginning next turn');
    } else {
      console.log('playing out cards because of tie');
    }
    var turnObj = this.inProgressTurn || {
      ties: 0,
      cardsInPlay: []
    };
    var winningCardValue = 0;
    var tiedPlayers = [];
    var winner;

    for (let player in this.players) {
      if (this.players.hasOwnProperty(player)) {
        let playersCard;

        if (this.resetReserve(player)) break;

        playersCard = this.players[player].reserve.length ? this.players[player].reserve.pop() : null;

        if (!playersCard) {
          this.resolveLoss(player);
          break;
        }

        if (cards) {
          let reserve = this.players[player].reserve;

          if (reserve.length < cards) {
            this.resetReserve(player, true);

            reserve = this.players[player].reserve;

            if (reserve.length < cards) { cards = reserve.length; }
          }

          turnObj.cardsInPlay = turnObj.cardsInPlay.concat(reserve.splice(reserve.length - cards, cards));
        }
      
        turnObj.cardsInPlay.push(playersCard);
        turnObj[player] = turnObj[player] || {};

        turnObj[player].card = playersCard;
        turnObj[player].card.name = playersCard.getName();
        turnObj[player].card.value = playersCard.getValue();

        if (playersCard.getValue() > winningCardValue) {
          winner = player;
          winningCardValue = playersCard.getValue();
        } else if (playersCard.getValue() === winningCardValue) {
          winner = 'tie';

          if (tiedPlayers.length) {
            tiedPlayers.push(player);
          } else {
            tiedPlayers = [winner, player];
          }
        }
      }
    }

    turnObj.result = {
      winner: winner,
      hiValue: winningCardValue
    }

    this.inProgressTurn = turnObj;

    return turnObj;
  }

  /**
   * Method to resolve an in-progress turn.
   * @return {Object|Function} - Either the object describing the turn, or the method to resolve a tie.
   */
  resolveTurn() {
    if (!this.inProgressTurn) return 'Turn not in progress';

    var turn = this.inProgressTurn;
    var winner = turn.result.winner;


    if (this.players[winner]) {
      this.gameTurn += 1;
      turn.turnIndex = this.gameTurn;

      this.players[winner].discard = this.players[winner].discard.concat(turn.cardsInPlay);

      this.inProgressTurn = null;

      for (let player in this.players) {
        if (this.players.hasOwnProperty(player)) { this.resetReserve(player); }
      }

      return turn;
    } else {
      return this.resolveTie();
    }
  }

  /**
   * A method to resolve a tied turn.
   * @return {Function} - The invocation of the play out cards method.
   */
  resolveTie() {
    var turn = this.inProgressTurn;
    var isTie = turn ? turn.result.winner === 'tie' : false;

    if (!turn || !isTie) return 'Tied turn not in progress';

    turn.ties += 1;

    return this.playOutCards(this.TIE_CARDS_FACEDOWN);
  }

  /**
   * Flips the player's discard deck back to their reserve deck.  If both are empty, eliminates the
   * player from the game.
   * @param  {String} player - A reference to one of the players in the game players object.
   * @param  {[Boolean]} force - [Pass true if the player's reserve deck isn't enough to cover a tied turn playout.]
   * @return {*} - Undefined if the deck is reset; if a player is eliminated, the invocation of the resolveLoss method.
   */
  resetReserve(player, force) {
    var shouldReset = this.players[player].reserve.length === 0 || force;
    var playerIsOutOfCards = this.players[player].reserve.length === 0 && this.players[player].discard.length === 0;

    if (playerIsOutOfCards) {
      return this.resolveLoss(player);
    } else if (shouldReset) {
      this.players[player].reserve = this.deck.shuffleHand(this.players[player].reserve.concat(this.players[player].discard));
      this.players[player].discard = [];
    }
  }

  /**
   * Eliminates the passed player from the game. If after such elimination only one player is left, 
   * declares the final player the winer.
   * @param  {String} loser - Reference to the eliminated player.
   */
  resolveLoss(loser) {
    var survivingPlayers = [];

    for (let player in this.players) {
      if (player !== loser) {
        survivingPlayers.push(player);
      }
    }

    if (survivingPlayers.length === 1) {
      return this.declareWinner(survivingPlayers[0]);
    } else {
      this.eliminatePlayer(loser);
    }
  }

  /**
   * Method to declare the winner of the game. Sets the game state to 1.
   * @param  {String} winner - 
   * @return {Boolean} - Returns true for upstream logic checks for ending the game.
   */
  declareWinner(winner) {
    this.gameState = 1;
    return true;
  }

  /**
   * Adds players to the class losingPlayers array.
   * @param  {String} loser - A reference to the player that has been eliminated.
   */
  eliminatePlayer(loser) {
    this.losingPlayers.push({ losingPlayer: loser, turnId: this.gameTurn });
  }
}

export default WarGame;