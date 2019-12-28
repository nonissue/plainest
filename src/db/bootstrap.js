const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_KEY,
});

if (!process.env.FAUNA_DB_KEY) {
  console.log('Required FAUNA_DB_KEY enviroment variable not found.');
  console.log(`Make sure you have created your Fauna databse with "netlify addons:create fauna"`);
  console.log(`Then run "npm run bootstrap" to setup your database schema`);
  process.exit(1);
}

function createFaunaDB() {
  console.log('Creating the fauna database schema!');

  /* Based on your requirements, change the schema here */
  return client
    .query(q.Create(q.Ref('classes'), { name: 'posts' }))
    .then(() => {
      return client.query(
        q.Create(q.Ref('indexes'), {
          name: 'all_posts_1',
          source: q.Ref('classes/posts'),
        }),
      );
    })
    .catch(err => {
      // Database already exists
      if (err.requestResult.statusCode === 400 && err.message === 'instance already exists') {
        console.log('Fauna collection already exists! Good to go');
      } else {
        throw err;
      }
    });
  console.log('Done!');
}

function createFaunaIndex1() {
  console.log('Creating the default indexes');

  return client
    .query(
      q.Create(q.Ref('indexes'), {
        name: 'all_posts',
        source: q.Ref('classes/posts'),
      }),
    )
    .catch(err => {
      if (err.requestResult.statusCode === 400 && err.message === 'instance already exists') {
        console.log('Fauna indexes already setup! Good to go');
      } else {
        console.log(err);
        throw err;
      }
    });
}

function createFaunaIndex() {
  console.log('Creating the default indexes');

  return client
    .query(
      q.CreateIndex({
        name: 'posts-latest1',
        source: q.Collection('posts'),
        values: [{ field: ['data'], reverse: true }, { field: ['ref'] }],
      }),
    )
    .catch(err => {
      if (err.requestResult.statusCode === 400 && err.message === 'instance already exists') {
        console.log('Fauna indexes already setup! Good to go');
      } else {
        console.log(err);
        throw err;
      }
    });
}

if (process.env.FAUNA_DB_KEY) {
  createFaunaDB().catch(err => {
    console.log(err);
    console.log('Attempt unsuccessful');
  });
  createFaunaIndex1().catch(err => {
    console.log(err);
    console.log('Attempt unsuccessful');
  });

  // const test = client.paginate(q.Match(q.Index('all_posts_1', 'posts')), { size: 1 });
  // // .catch(err => console.log(err));
  // test
  //   .map(function(ref) {
  //     return q.Get(ref);
  //   })
  //   .each(function(page) {
  //     console.log('first page');
  //     page.map(p => {
  //       console.log('another page');
  //       console.log(p.data.posts);
  //     });
  //     // console.log(page); // Will log the page's contents, for example: [ Ref("collections/test/1234"), ... ]
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  const getAllPostDataQuery = ret =>
    ret.map(ref => {
      return q.Get(ref);
    });

  const test = client
    .query(q.Paginate(q.Match(q.Index('all_posts'))))
    // .then(ret => {
    //   // console.log(ret.data);
    //   return ret.data.map(ref => JSON.stringify(q.Get(ref));
    //   // console.log(q.Get(ret.data.ref));
    // })
    .then(res => {
      return client.query(getAllPostDataQuery(res.data)).then(ret => {
        return ret;
      });
    })
    .then(res => {
      return { body: res };
    })
    .catch(err => console.log(err));

  test.then(res => {
    console.log(typeof res.body);
    console.log(Object.entries(res.body));
  });
  // console.log(getAllPostDataQuery);

  // client.query(getAllPostDataQuery).then(ret => {
  //   console.log(ret);
  // });
}
//   console.log('Done!');
// }
