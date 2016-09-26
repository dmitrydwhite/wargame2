// Import dependencies
import React, { Component } from 'react';

// Import Styling
import './HeaderBar.css';

/**
 * HeaderBar Component
 * @extends {Component}
 */
class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar row-12">
        <div className="column-1"></div>
        <div className="column-3 title-text">War</div>
        <div className="column-3 mob-non"></div>
        <div className="tag-text column-5 mob-8">a rendition of the classic card game by Dmitry White</div>

        <div className="clearfix"></div>
      </div>
    )
  }
}

export default HeaderBar;