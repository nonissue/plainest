import axios from 'axios';
/* code from functions/todos-create.js */
/* Import faunaDB sdk */
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_KEY,
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  // kind of a hacky way to get things to work in dev and when deployed
  // should probably just use env var somehow?
  const apiEndpoint =
    event.headers.host === 'localhost:9000'
      ? 'http://localhost:9000/instagram'
      : 'http://plainest.site/.netlify/functions/instagram';

  console.log(apiEndpoint);
  let res;

  try {
    res = await axios(`${apiEndpoint}`);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }

  // lol fauna has a ts variable
  // why did i do this
  const timestamp = Date.now();
  const newPosts = { data: { fetchDate: timestamp, posts: res.data } };
  console.log(res.data);

  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/posts'), newPosts))
    .then(response => {
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch(error => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
