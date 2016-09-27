// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './PlayArea.css';

// Import subordinate Component
import StrengthCircle from '../StrengthCircle/StrengthCircle.js';


/**
 * PlayArea Component
 * @extends {Component}
 */
class PlayArea extends Component {
  showExtras(count) {
    var extrasMarkup = [];

    for (let i=0; i<count; i++) {
      extrasMarkup.push(
        <div key={i} className="extra-card"></div>
      )
    }

    return extrasMarkup;
  }

  calculateWinners() {
    var computerCardVal = this.props.display.computer.value || 0;
    var userCardVal = this.props.display.user.value || 0;
    var ret = {
      user: false,
      computer: false
    };

    ret.user = userCardVal > computerCardVal;
    ret.computer = computerCardVal > userCardVal;

    return ret;
  }

  render() {
    var display = this.props.display;
    var extras = this.showExtras(display.extra);
    var winner = this.calculateWinners();

    return (
      <div className="play-area" >
        <div className="card-display computer">
          <StrengthCircle value={this.props.display.computer.name} winner={winner.computer} />
          <div className="extra-cards">{extras}</div>
        </div>
        <div className="card-display user">
          <div className="extra-cards">{extras}</div>
          <StrengthCircle value={this.props.display.user.name} winner={winner.user} />
        </div>
      </div>
    )
  }
}

export default PlayArea;