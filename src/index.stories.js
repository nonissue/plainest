import React from 'react';
// import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { InstaGrid } from './pages/InstaGrid';
import { AppHeader, Nav } from './components';
import './index.css';

// import api from './utils/api.js';

export default { title: 'Homepage' };

const postsMock = [
  {
    id: '2144811289880636561_20196334360',
    link: 'https://www.instagram.com/p/B3D5oEjlSyR/',
    images: {
      thumbnail: {
        width: 150,
        height: 150,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      low_resolution: {
        width: 320,
        height: 211,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      standard_resolution: {
        width: 640,
        height: 423,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
    },
    caption: 'X.',
  },
  {
    id: '2144811289880636561_20196334360',
    link: 'https://www.instagram.com/p/B3D5oEjlSyR/',
    images: {
      thumbnail: {
        width: 150,
        height: 150,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      low_resolution: {
        width: 320,
        height: 211,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      standard_resolution: {
        width: 640,
        height: 423,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
    },
    caption: 'X.',
  },
  {
    id: '2144811289880636561_20196334360',
    link: 'https://www.instagram.com/p/B3D5oEjlSyR/',
    images: {
      thumbnail: {
        width: 150,
        height: 150,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      low_resolution: {
        width: 320,
        height: 211,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
      standard_resolution: {
        width: 640,
        height: 423,
        url:
          'https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com',
      },
    },
    caption: 'X.',
  },
];

export const ImageGrid = () => (
  <MemoryRouter initialEntries={['/images?src=test']}>
    <InstaGrid posts={postsMock} />
  </MemoryRouter>
);

export const Header = () => (
  <MemoryRouter initialEntries={['/']}>
    <AppHeader />
  </MemoryRouter>
);

export const NavStandalone = () => (
  <MemoryRouter initialEntries={['/']}>
    <Nav />
  </MemoryRouter>
);

// export const withText = () => <Button>Hello Button</Button>;

// export const withEmoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
