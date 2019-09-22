const axios = require('axios')

// exports.handler = function instagram(event, context, callback) {
//   const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
//   const token = '1432025.1677ed0.f959efc0734b4decaf34ce8bde19a865'
//   const limit = 5

//   axios
//     .get(`${endpoint}?access_token=${token}&count=${limit}`)
//     .then(({ data: { data: posts } }) => {
//       callback(null, {
//         statusCode: 200,
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(
//           posts.map(i => ({
//             id: i.id,
//             link: i.link,
//             images: i.images,
//             videos: i.videos,
//             caption: i.caption.text
//           })),
//         ),
//       })
//     })
//     .catch((e) => {
//       callback(e)
//     })
// }

// exports.handler = async function instagram (event, context, callback) => {
//   const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
//   const token = '1432025.1677ed0.f959efc0734b4decaf34ce8bde19a865'
//   const limit = 5
//   // const body = JSON.parse(event.body)
//   const res = await axios.get(`${endpoint}?access_token=${token}&count=${limit}`);

//   return {

//   }

//   // const res = await axios.get(body.url)

//   return {
//      statusCode: res.status,
//      body: res.data
//   }
// }

export async function handler(event, context) {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
  const token = '1432025.1677ed0.f959efc0734b4decaf34ce8bde19a865'
  const limit = 5

  try {
    const response = await axios.get(`${endpoint}?access_token=${token}&count=${limit}`);
    const { data: posts } = response.data;
    console.log(posts);
    return {
      statusCode: 200,
      body: JSON.stringify(posts.map(i => ({
        id: i.id,
        link: i.link,
        images: i.images,
        videos: i.videos,
        caption: i.caption.text
      })))
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

 
}