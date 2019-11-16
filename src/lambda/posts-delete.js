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
