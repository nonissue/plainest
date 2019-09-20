const axios = require('axios')

exports.handler = function instagram(event, context, callback) {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
  const token = '1432025.1677ed0.f959efc0734b4decaf34ce8bde19a865'
  const limit = 5

  axios
    .get(`${endpoint}?access_token=${token}&count=${limit}`)
    .then(({ data: { data: posts } }) => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          posts.map(i => ({
            id: i.id,
            link: i.link,
            images: i.images,
            videos: i.videos,
            caption: i.caption.text,
          })),
        ),
      })
    })
    .catch((e) => {
      callback(e)
    })
}