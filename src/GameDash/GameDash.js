// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './GameDash.css';

import ButtonArea from '../ButtonArea/ButtonArea.js';
import StrengthCircle from '../StrengthCircle/StrengthCircle.js';


/**
 * GameDash Component
 */
class GameDash extends Component {
  dispatchClick() {
    this.props.gameSwitch(this.props.buttonType);
  }

  render() {
    return (
      <div className="game-dash" >
        <div className="row-12" >
          <div className="column-4">
            <StrengthCircle value={this.props.status.reserve.length} label="RESERVE" />
          </div>
          <div className="column-4">
            <ButtonArea {...this.props} onClick={this.dispatchClick.bind(this)} />
          </div>
          <div className="column-4">
            <StrengthCircle value={this.props.status.discard.length} label="DISCARD" />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

export default GameDash;