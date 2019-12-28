import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

jest.mock('axios');

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  const div = document.createElement('div');

  renderer.render(
    <Router initialEntries={['./']}>
      <App />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
