const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

// Ugly as hell way of doing this, but no worse than reversing the order?
// could also just shift or pop or something?
exports.handler = (event, context) => {
  console.log("Function `posts-read-all` invoked");
  return (
    client
      // .query(q.Paginate(q.Match(q.Ref("indexes/all_posts"))))
      .query(q.Paginate(q.Match(q.Index("all_posts"))))
      .then(response => {
        const postRefs = response.data;
        console.log("Post refs", postRefs);
        console.log(`${postRefs.length} posts found`);
        console.log("postsRefs: " + postRefs);
        const latestPostRef = postRefs[postRefs.length - 1];

        const getLatestPost = q.Get(latestPostRef);
        // then query the refs
        return client.query(getLatestPost).then(ret => {
          return {
            statusCode: 200,
            body: JSON.stringify(ret)
          };
        });
      })
      .catch(error => {
        console.log("error", error);
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        };
      })
  );
};