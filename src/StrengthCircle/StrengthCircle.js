// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './StrengthCircle.css';

/**
 * StrengthCircle Component
 * @extends {Component}
 * @prop {String} value
 * @prop {[*]} [winner]
 * @prop {[String]} [label]
 */
class StrengthCircle extends Component {
  getLabelText() {

  }

  /**
   * Render the template
   * @return {JSX}
   */
  render() {
    var labelText = this.props.label ?
      <p className="label-text">{this.props.label}</p> :
      '';

    var classString = 'strength-circle';
    classString += this.props.winner ? ' winner' : '';

    return (
      <div className={classString} >
        <p className="strength-text">{this.props.value}</p>
        {labelText}
      </div>
    )
  }
}

export default StrengthCircle;