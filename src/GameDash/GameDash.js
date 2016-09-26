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
          <div className="column-1"></div>
          <StrengthCircle value={this.props.status.reserve.length} label="RESERVE" />
          <div className="column-1 mob-3"></div>
          <div className="column-6 mob-bottom-btn">
            <ButtonArea {...this.props} onClick={this.dispatchClick.bind(this)} />
          </div>
          <div className="column-1 mob-3"></div>
          <StrengthCircle value={this.props.status.discard.length} label="DISCARD" />
          <div className="column-1"></div>

          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

export default GameDash;