/* eslint-disable import/prefer-default-export */
const axios = require('axios');
// cache results, poll for changes?

// eslint-disable-next-line no-unused-vars
export async function handler(event, context) {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent';
  const token = '20196334360.1677ed0.50589d21a9b743e9831e9aba8556268d';
  const limit = 15;

  console.log(process.env.NODE_ENV);

  try {
    // perform our axios data request
    const response = await axios.get(`${endpoint}?access_token=${token}&count=${limit}`);
    const { data: posts } = response.data;

    return {
      statusCode: 200,
      // first, convert the json response to js object
      // then, extract only the data we want from that object
      body: JSON.stringify(
        posts.map(i =>
          !i.videos
            ? {
                id: i.id,
                link: i.link,
                images: i.images,
                width: i.images.standard_resolution.width,
                height: i.images.standard_resolution.height,
                src: i.images.standard_resolution.url,
                videos: i.videos,
                caption: i.caption.text,
              }
            : {
                id: i.id,
                link: i.link,
                images: i.images,
                width: i.images.low_resolution.width,
                height: i.images.low_resolution.height,
                src: i.images.low_resolution.url,
                videos: i.videos,
                caption: i.caption.text,
              },
        ),
      ),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}
