// Import dependencies
import React, { Component } from 'react';

// Import Component styling
import './GameInfoArea.css';

/**
 * GameInfoArea Component
 * @prop {Array} losers
 * @prop {Boolean} display
 * @prop {String} gameId
 * @prop {Function} restart
 */
class GameInfoArea extends Component {
  /**
   * Render the template
   * @return {JSX}
   */  
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