import axios from "axios";
import api from "../utils/api";
import isLocalHost from "../utils/isLocalHost";
/* code from functions/todos-create.js */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

// postsMock[
// {
//   id: '2136664212772360300_20196334360',
//   link: 'https://www.instagram.com/p/B2m9MfulhBs/',
//   images: {
//     thumbnail: [Object],
//     low_resolution: [Object],
//     standard_resolution: [Object]
//   },
//   caption: 'ii,ii,ii'
// },
// {
//   id: '2136131532372629076_20196334360',
//   link: 'https://www.instagram.com/p/B2lEE-clNZU/',
//   images: {
//     thumbnail: [Object],
//     low_resolution: [Object],
//     standard_resolution: [Object]
//   },
//   caption: 'v'
// },
// {
//   id: '2133912612840580600_20196334360',
//   link: 'https://www.instagram.com/p/B2dLjcmFqX4/',
//   images: {
//     thumbnail: [Object],
//     low_resolution: [Object],
//     standard_resolution: [Object]
//   },
//   caption: 'iv'
// }
// ]

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  // const data = JSON.parse(event.body);
  console.log("Function `posts-create` invoked");

  const res = await axios(`http://localhost:9000/instagram`);

  // change url below if we are in dev or deployed...
  // try {
  //   const res = await axios(`http://localhost:9000/instagram`);
  //   console.log(res);
  // } catch (err) {
  //   console.log("Error!");
  //   console.log(err);
  //   // return err;
  // }
  const timestamp = Date.now();
  const newPosts = { data: { fetchDate: timestamp, posts: res.data } };
  console.log(res.data);

  // console.log(test);
  const todoItem = {
    // this works, but res.data does not, probably because it's an array
    data: res.data[0]
  };

  console.log(typeof res.data);

  // forEach item in array res.data, call posts-create with item

  // const res = await axios(`http://localhost:9000/instagram`);

  // const posts2 = "test";
  // const posts3 = { test: "test" };

  // const posts = {
  //   // fetchDate: new Date.now(),
  //   posts: JSON.stringify(res)
  // };

  // const postItem = {
  //   data: data
  // };

  // console.log("")

  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref("classes/posts"), newPosts))
    .then(response => {
      // console.log("success", response);
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
