/**
 * Helper function for shuffling the deck
 * @param  {Number} min - The lower bound (inclusive) for generating a random number.
 * @param  {Number} max - The upper bound for generating a random number.
 * @return {Number} - A random Integer between min (inclusive) and max(exclusive).
 */
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Card class
 */
class Card {
  /**
   * Create a card with protected getters for name and value.
   * @param  {String} name  The display name of the card.
   * @param  {Number} value The value of the card.
   * @return {Card} - An instance of the class with methods for accessing name and value.
   */
  constructor(name, value) {
    var getName = function () {
      return name;
    }

    var getValue = function () {
      return value;
    }

    return {
      getName,
      getValue
    }
  }
}

class DeckUtils {
  /**
   * Shuffles the passed deck iteratively (sorry).
   * @param {Array} deck An array of Cards.
   * @returns {Array} The passed deck, but shuffled.
   */
  static shuffle(deck) {
    var cards = deck.length;
    var newDeck = [];

    for (let i=0; i<cards; i++) {
      let newIdx, foundSlot = false;

      while (!foundSlot) {
        newIdx = getRandomInt(0, cards);
        if (!newDeck[newIdx]) {
          newDeck[newIdx] = deck[i];
          foundSlot = true;
        }
      }
    }

    return newDeck;
  }
}

/**
 * Deck of Cards class
 */
class Deck {
  constructor(opts) {
    this.suits = ['♠', '♥', '♦', '♣'];
    this.rankOrder = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    this.rankedJokers = [];
    this.isWrapped = true;
    this.useOpts(opts);
    this.deck = [];
  }

  /**
   * Override class defaults with passed options.
   */
  useOpts() {
    return true;
  }

  /**
   * Builds the deck from the class parameters.
   * @return {this} Chainable.
   */
  unWrap() {
    for (let suit=0; suit<this.suits.length; suit++) {
      for (let card=0; card<this.rankOrder.length; card++) {
        let cardValue = this.rankOrder.length - card;
        let cardName = '' + this.rankOrder[card] + this.suits[suit];

        this.deck.push(new Card(cardName, cardValue));
      }
    }

    return this;
  }

  /**
   * Use the shuffle util to shuffle the whole deck.
   * @return {this} - Chainable.
   */
  shuffle() {
    this.deck = DeckUtils.shuffle(this.deck);

    return this;
  }

  /**
   * Use the shuffle util to shuffle a portion of any deck.
   * @param  {Array} hand - The array of cards to shuffle.
   * @return {Array} - The shuffled cards.
   */
  shuffleHand(hand) {
    return DeckUtils.shuffle(hand);
  }

  /**
   * Deals a number of cards.
   * @param  {[Number]} cards - [The number of cards to deal; defaults to 1.]
   * @param  {[Array]} hand - [The hand of cards to add this deal to.]
   * @return {*} - Either a single card object, the array of dealt cards, or the passed hand(Array) of cards including the newly dealt cards.
   */
  deal(cards, hand) {
    var cardsToDeal = 1;
    var oneCardAsArray, addToHand, deal;

    if (cards) {
      if (typeof cards === 'boolean') {
        oneCardAsArray = cards;
      } else if (typeof cards === 'number') {
        cardsToDeal = cards;
      }
    }

    if (hand && hand instanceof Array) {
      addToHand = true;
    } else if (typeof hand === 'boolean') {
      // Handling the edge case of a user calling Deck.deal(1, true);
      oneCardAsArray = hand;
    }

    if (cardsToDeal === 1) {
      deal = oneCardAsArray ? [this.deck[0]] : this.deck[0];
    } else {
      deal = this.deck.splice(0, cardsToDeal);
    }

    if (addToHand) {
      deal = deal instanceof Array ? hand.concat(deal) : hand.push(deal);
    }

    return deal;
  }
}

export default Deck;

