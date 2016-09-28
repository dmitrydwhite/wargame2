import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import GameInfoArea from './GameInfoArea';

describe('GameInfoArea', () => {
  var div = null;
  var mockProps = null;

  beforeEach( () => {
    div = document.createElement('div');
    mockProps = {
      losers: ['user'],
      display: true,
      gameId: '12345',
      restart: () => { return true; }
    };
  });

  it('shallow renders without crashing', () => {
    shallow(<GameInfoArea
      losers={mockProps.losers}
      display={mockProps.display}
      gameId={mockProps.gameId}
      restart={mockProps.restart}
    />, div);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<GameInfoArea
      losers={mockProps.losers}
      display={mockProps.display}
      gameId={mockProps.gameId}
      restart={mockProps.restart}
    />, div);
  });
});