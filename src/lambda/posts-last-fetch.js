const faunadb = require("faunadb");
// const getId = require("./utils/getId");

function getId(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0];
}

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  // Move somewhere secure
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

exports.handler = (event, context) => {
  const id = getId(event.path);
  console.log(`Function 'posts-last-fetch' invoked. Read id: ${id}`);
  return client
    .query(q.Paginate(q.Match(q.Index("posts_fetchdate_latest")), { size: 1 }))
    .then(response => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
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

// this kind of works, returns:

// [
//     [
//         1573882410140,
//         {
//             "@ref": {
//                 "id": "249166362431193610",
//                 "collection": {
//                     "@ref": {
//                         "id": "posts",
//                         "collection": {
//                             "@ref": {
//                                 "id": "collections"
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     ]
// ]
