// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './GameDash.css';

import ButtonArea from '../ButtonArea/ButtonArea.js';
import StrengthCircle from '../StrengthCircle/StrengthCircle.js';


/**
 * GameDash Component
 * @prop {Function} gameSwitch
 * @prop {Object} status - Expects props `reserve: {Array}` and `discard: {Array}`
 * @prop {String} buttonType
 */
class GameDash extends Component {
  /**
   * Invokes the gameSwitch function with this Component's buttonType
   */
  dispatchClick() {
    console.log('' + this.props.gameSwitch);
    this.props.gameSwitch(this.props.buttonType);
  }

  /**
   * Render the template
   * @return {JSX}
   */
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