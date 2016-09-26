// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './StrengthCircle.css';

class StrengthCircle extends Component {
  getLabelText() {

  }

  render() {
    var labelText = this.props.label ?
      <p className="label-text">{this.props.label}</p> :
      '';

    return (
      <div className="strength-circle column-1">
        <p className="strength-text">{this.props.value}</p>
        {labelText}
      </div>
    )
  }
}

export default StrengthCircle;