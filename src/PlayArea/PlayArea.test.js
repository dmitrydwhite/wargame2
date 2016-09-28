import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import PlayArea from './PlayArea';

describe('PlayArea', () => {
  var div = null;
  var mockProps = null;

  beforeEach( () => {
    div = document.createElement('div');
    mockProps = {
      display: {
        user: {
          value: 12,
          name: 'Twelve of zeros'
        },
        computer: {
          value: 2,
          value: 'Two of zeros'
        }
      }
    };
  });

  it('shallow renders without crashing', () => {
    shallow(<PlayArea
      display={mockProps.display}
    />, div);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<PlayArea
      display={mockProps.display}
    />, div);
  });
});