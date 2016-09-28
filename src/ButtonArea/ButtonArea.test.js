import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ButtonArea from './ButtonArea';

describe('ButtonArea', () => {
  var div = null;
  var mockProps = null;

  beforeEach( () => {
    div = document.createElement('div');
    mockProps = {
      winner: 'Winner',
      type: 'Type',
      buttonType: 'play',
      onClick: () => { return true; }
    };
  });

  it('shallow renders without crashing', () => {
    shallow(<ButtonArea
      winner={mockProps.winner}
      type={mockProps.type}
      buttonType={mockProps.buttonType}
      onClick={mockProps.onClick}
    />, div);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<ButtonArea
      winner={mockProps.winner}
      type={mockProps.type}
      buttonType={mockProps.buttonType}
      onClick={mockProps.onClick}
    />, div);
  });
})