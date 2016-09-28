// Import dependencies
import React, { Component } from 'react';

import './GameInfoArea.css';

class GameInfoArea extends Component {
  render() {
    var wonLost = this.props.losers.indexOf('user') === -1 ? 'WON' : 'LOST';
    var renderJsx;

    renderJsx = this.props.display ? 
      (
        <div className="game-info">
          <div className="game-info-text">
            <div className="result-wl">
              YOU {wonLost} THE WAR
            </div>
            <div className="result-message">
              Your game ID is
            </div>
            <div>{this.props.gameId}</div>
            <div className="action-btn" onClick={this.props.restart} >
              START NEW GAME
            </div>
          </div>
        </div>
      ) :
      null;

    return renderJsx;
  }
}

export default GameInfoArea;