import axios from 'axios';

export async function getPosts() {
  let res;

  try {
    res = await axios('/.netlify/functions/posts-read-latest');
    return res.data.data.posts;
  } catch (err) {
    console.log('Getposts error');
    // throw new Error('getPosts error');
  }
}
export default getPosts;
