// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './PlayArea.css';

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

  render() {
    var extras = this.showExtras(this.props.display.extra);

    return (
      <div className="play-area" >
        <div className="card-display computer">
          <StrengthCircle value={this.props.display.computer.name} />
          {extras}
        </div>
        <div className="card-display user">
          <StrengthCircle value={this.props.display.user.name} />
          {extras}
        </div>
      </div>
    )
  }
}

export default PlayArea;