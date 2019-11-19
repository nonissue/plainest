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

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADdJQsv_ACCk1D6Izxwmf6TcbbjhLmbAGRdcGC"
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  // resolve the discprenacy between dev function calls and prod?
  const apiEndpoint = process.env.NETLIFY_DEV
    ? "http://localhost:9000/instagram"
    : "http:plainest.site/.netlify/functions/instagram";
  let res;

  try {
    res = await axios(`${apiEndpoint}`);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }

  // lol fauna has a ts variable
  // why did i do this
  const timestamp = Date.now();
  const newPosts = { data: { fetchDate: timestamp, posts: res.data } };
  console.log(res.data);

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
