// import axios from 'axios';
// import axios, * as others from 'axios';
// import axios from 'axios';
import mockAxios from 'axios';
import { handler } from './instagram';

// jest.mock('axios');
// axios.mockResolvedValue();
afterEach(() => {
  jest.clearAllMocks();
});

const data = [
  {
    id: '1',
    link: 'https://url.com',
    images: {
      thumbnail: {
        width: 150,
        height: 150,
        url: 'https://url.com/1',
      },
      low_resolution: {
        width: 320,
        height: 213,
        url: 'https://url.com/2',
      },
      standard_resolution: {
        width: 640,
        height: 426,
        url: 'https://url.com/3',
      },
    },
    width: 640,
    height: 426,
    src: 'https://url.com/4',
    caption: 'Caption goes here',
  },
];

it('calls axios and returns images', async () => {
  try {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: data,
        },
      }),
    );
  } catch (e) {
    throw new Error(500);
  }

  let posts;

  try {
    posts = await mockAxios.get();
  } catch (e) {
    throw new Error(500);
  }

  expect(posts.data.results).toEqual(data);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

it('fetches erroneously data from an API', async () => {
  mockAxios.get.mockRejectedValue({ error: 'some error' });

  try {
    await mockAxios.get().catch(err => {
      expect(err).toEqual({ error: 'some error' });
    });
  } catch {
    throw new Error(500);
  }
});
