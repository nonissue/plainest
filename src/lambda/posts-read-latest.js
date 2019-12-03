const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: process.env.FAUNA_DB_KEY,
});
// Ugly as hell way of doing this, but no worse than reversing the order?
// could also just shift or pop or something?

exports.handler = (event, context) => {
  console.log('Function `posts-read-all` invoked');
  return client
    .query(q.Paginate(q.Match(q.Index('all_posts'))))
    .then(response => {
      const postRefs = response.data;
      console.log(`${postRefs.length} posts found`);

      const latestPostRef = postRefs[postRefs.length - 1];

      const getLatestPost = q.Get(latestPostRef);
      // then query the refs
      return client.query(getLatestPost).then(ret => {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'text/json',
          },
          body: JSON.stringify(ret),
        };
      });
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
