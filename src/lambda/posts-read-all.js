const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: process.env.FAUNA_DB_KEY,
});

exports.handler = (event, context) => {
  console.log('Function `posts-read-all` invoked!');
  return (
    client
      // .query(q.Paginate(q.Match(q.Ref("indexes/all_posts"))))
      .query(q.Paginate(q.Match(q.Index('all_posts'))))
      .then(response => {
        const postRefs = response.data;
        console.log('Post refs', postRefs);
        console.log(`${postRefs.length} post collections found`);
        // create new query out of post refs. http://bit.ly/2LG3MLg
        const getAllPostDataQuery = postRefs.map(ref => {
          return q.Get(ref);
        });
        // then query the refs
        return client.query(getAllPostDataQuery).then(ret => {
          return {
            statusCode: 200,
            body: JSON.stringify(ret),
          };
        });
      })
      .catch(error => {
        console.log('error', error);
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        };
      })
  );
};
