import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Grid } from './Grid';

// fake posts for testing Grid component
const posts = [
  {
    id: '2132993117535947662_20196334360',
    link: 'https://www.instagram.com/p/B2Z6fB3FUuO/',
    images: {
      thumbnail: {
        width: 150,
        height: 150,
        url:
          'https://scontent.cdninstagram.com/v/t51.2885-15/e35/c180.0.1080.1080a/s150x150/67792049_159084425208056_7975383857255215210_n.jpg?_nc_ht=scontent.cdninstagram.com&oh=4825b37aae9f46e670bcb854ab8a6cdf&oe=5E7B1D34',
      },
      low_resolution: {
        width: 320,
        height: 240,
        url:
          'https://scontent.cdninstagram.com/v/t51.2885-15/e35/s320x320/67792049_159084425208056_7975383857255215210_n.jpg?_nc_ht=scontent.cdninstagram.com&oh=34c2bececc4fec9ec0f61fc3e464b546&oe=5E802B5E',
      },
      standard_resolution: {
        width: 640,
        height: 480,
        url:
          'https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/67792049_159084425208056_7975383857255215210_n.jpg?_nc_ht=scontent.cdninstagram.com&oh=0334d4e35add7585465c85dc50aca39e&oe=5EAFF709',
      },
    },
    width: 640,
    height: 480,
    src:
      'https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/67792049_159084425208056_7975383857255215210_n.jpg?_nc_ht=scontent.cdninstagram.com&oh=0334d4e35add7585465c85dc50aca39e&oe=5EAFF709',
    caption: 'i',
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');

  act(() => {
    ReactDOM.render(
      <Router>
        <Route
          exact
          path={['/posts/:id', '/']}
          // eslint-disable-next-line react/jsx-props-no-spreading
          component={props => <Grid posts={posts} {...props} />}
        />
      </Router>,
      div,
    );
  });
  ReactDOM.unmountComponentAtNode(div);
});
