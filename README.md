# Wargame2

#### A rendition of the classic card game "War"

by Dmitry White

#### Development Notes

##### Getting started
I built this using the utility [`create-react-app`](https://github.com/facebookincubator/create-react-app), as I have not fully completed a React app yet and am still learning about the ins and outs of getting React set up.

##### Building
This project is currently hosted on heroku at:

https://wargame2.herokuapp.com/

Build to heroku is enabled by [mars](https://github.com/mars)'s [`create-react-app-buildpack`](https://github.com/mars/create-react-app-buildpack).

##### Testing
`create-react-app` auto-integrates Jest, which I have not used before.  Each React component has a smoke-test for both deep and shallow renders.

##### Data Integration
I have wanted to integrate a project into Firebase for a while.  I figured that since this is basically a clicking game that generates a lot of data, this would be a good opportunity.  The Firebase database is [here](https://console.firebase.google.com/project/war-card-game-project/database/data), and can be accessed with the credentials `wargameaccess99@gmail.com / WARgame99`.

##### Code notes
Source code is available on Github [here](https://github.com/dmitrydwhite/wargame2).

I wrote or modified all the code in the `/src` folder with the exception of `favicon.ico` and `index.js`.

##### The game engine API
I wrote JS classes for card and deck, and used those to build a game engine for the game of war.

###### Start a new game

`var WG = require('./path/to/WarCardGame.js');`

`var newGame = new WG();`

Currently the game engine only supports 2 players, though some of the methods were written with the possibility of extending to more players.  Additionally, the underlying `Deck` class is written with extensibility in mind to allow for decks other than the standard 52-card French deck.

###### Start a turn

`newGame.playOutCards();`

This will return an object describing the turn.  Turns must be manually resolved (designed with a next-layer interaction engine in mind).

###### Resolve a turn

`newGame.resolveTurn();`

This will move the cards that are in play into the winner's discard pile.  It will auto-resolve any ties.  It returns an object describing the just-completed turn.

###### Playing the game

`while (newGame.gameState === 0) { ...`

The WarGame class carries a flag named `gameState` that will have the value of `0` while the game is active, `1` when a winner has been declared.
