import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import About from './About';
jest.mock('axios');

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<About />, div);
  ReactDOM.unmountComponentAtNode(div);
});
