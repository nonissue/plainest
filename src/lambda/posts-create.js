/* code from functions/todos-create.js */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log("Function `posts-create` invoked", data);
  const postItem = {
    data: data
  };

  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref("classes/posts"), postItem))
    .then(response => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};