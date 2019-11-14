const faunadb = require("faunadb");
const getId = require("./utils/getId");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

exports.handler = (event, context) => {
  const id = getId(event.path);
  console.log(`Function 'posts-read' invoked. Read id: ${id}`);
  return client
    .query(q.Get(q.Ref(`classes/posts/${id}`)))
    .then(response => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
