import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import GameDash from './GameDash';

describe('GameDash', () => {
  var div = null;
  var mockProps = null;

  beforeEach( () => {
    div = document.createElement('div');
    mockProps = {
      gameSwitch: () => { return true; },
      status: {
        reserve: ['status', 'reserve'],
        discard: ['status', 'discard']
      },
      buttonType: 'play'
    };
  });

  it('shallow renders without crashing', () => {
    shallow(<GameDash
      gameSwitch={mockProps.gameSwitch}
      status={mockProps.status}
      buttonType={mockProps.buttonType}
    />, div);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<GameDash
      gameSwitch={mockProps.gameSwitch}
      status={mockProps.status}
      buttonType={mockProps.buttonType}
    />, div);
  });
});
