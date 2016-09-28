import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import HeaderBar from './HeaderBar';

describe('HeaderBar', () => {
  var div = null;
  var mockProps = null;

  beforeEach( () => {
    div = document.createElement('div');
  });

  it('shallow renders without crashing', () => {
    shallow(<HeaderBar />, div);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<HeaderBar />, div);
  });
});