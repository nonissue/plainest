const faunadb = require('faunadb');
const getId = require('./utils/getId');

// function getId(urlPath) {
//   return urlPath.match(/([^\/]*)\/*$/)[0];
// }

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: process.env.FAUNA_DB_KEY,
});

exports.handler = (event, context) => {
  const id = getId(event.path);
  console.log(`Function 'posts-read' invoked. Read id: ${id}`);
  return client
    .query(q.Get(q.Ref(`classes/posts/${id}`)))
    .then(response => {
      console.log('success', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch(error => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
