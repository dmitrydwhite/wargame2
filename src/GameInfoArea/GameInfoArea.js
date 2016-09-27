// Import dependencies
import React, { Component } from 'react';

class GameInfoArea extends Component {
  render() {
    var renderJsx;

    renderJsx = this.props.display ? 
      (
        <div className="game-info">
          <div className="result-message">
          </div>
          <div className="action-btn">
          </div>
        </div>
      ) :
      ();

    return renderJsx;
  }
}