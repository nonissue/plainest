/* eslint-disable import/prefer-default-export */
const axios = require('axios');
// TODO: cache results, poll for changes?

// eslint-disable-next-line no-unused-vars
export async function handler(event, context) {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent';
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limit = 10;

  try {
    const response = await axios.get(`${endpoint}?access_token=${token}&count=${limit}`);
    const { data: posts } = response.data;

    return {
      statusCode: 200,
      // first, convert the json response to js object
      // then, extract only the data we want from that object
      body: JSON.stringify(
        posts.map(i =>
          // TODO: Proper type guard and not this janky shit
          // Make sure we only extract properties that exist
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
