const axios = require("axios");
// cache results, poll for changes?

export async function handler(event, context) {
  const endpoint = "https://api.instagram.com/v1/users/self/media/recent";
  const token = "20196334360.1677ed0.50589d21a9b743e9831e9aba8556268d";
  const limit = 10;

  try {
    // perform our axios data request
    const response = await axios.get(
      `${endpoint}?access_token=${token}&count=${limit}`
    );
    const { data: posts } = response.data;
    // console.log(posts);
    return {
      statusCode: 200,
      // first, convert the json response to js object
      // then, extract only the data we want from that object
      body: JSON.stringify(
        posts.map(i => ({
          id: i.id,
          link: i.link,
          images: i.images,
          videos: i.videos,
          caption: i.caption.text
        }))
      )
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
