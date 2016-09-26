// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './ButtonArea.css';

/**
 * ButtonArea Component
 */
class ButtonArea extends Component {
  render() {
    var btnDisplay = {
      computer: 'none',
      user: 'inherit'
    };

    var btnTextMap = {
      play: 'PLAY',
      ackResult: 'YOU %$',
      resolveTie: 'BATTLE',
      resetGame: 'GAME OVER'
    };

    var wonLost = this.props.winner === this.props.type ? 'WON' : 'LOST';
    var buttonText = this.props.buttonType ? btnTextMap[this.props.buttonType].replace('%$', wonLost) : '';

    return (
      <div className="row-12">
        <div className="column-3"></div>
        <div className="action-button column-6"
             onClick={this.props.onClick.bind(this)} 
             style={{'display' : btnDisplay[this.props.type]}}
        >{buttonText}</div>
        <div className="column-3"></div>
        <div className="clearfix"></div>
      </div>
    )
  }
}

export default ButtonArea;