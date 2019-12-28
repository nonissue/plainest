# Plainest.site

## Overview

A simple project to fetch and display posts from a specific instagram account as a responsive grid of images. Uses axios to fetch the data from the instagram api, and stores the results in faunadb, which is where they retreived from at page load.

Not really for public consumption, set up isn't very easy, and when I have time there's a lot that I'd rewrite.

### Features

- Netlify functions for serverless functions and an API
- FaunaDB for a simple, low-latency document store
- Responsive (kinda, maybe, ish)
- Custom modal for post detail view
  - Current route is updated when the detail view is invoked, without rerendering
  - Uses react router
- Animations done with framer-motion (in hindsight, probably should have used react-spring)

## Setup

1. Create a fauna db account, create a collection and get the key
2. Create a .env file with the following keys:

- `INSTAGRAM_ACCESS_TOKEN`
- `FAUNA_DB_KEY`

3. Start the lambda server (instructions below or `netlify dev`) and curl `http://localhost:3000/
4. In order to create the required fauna index, you need to install fauna shell. This index fetches the latest `posts` collection written to the DB.

```
CreateIndex({
  name: "posts-fetch-date",
  source: Collection("posts"),
  values: [
    { field: ["data", "fetchDate"], reverse: true },
    { field: ["ref"] }
  ]
})
```

3. Set the keys in Netlify build settings (under environment)

## Start

`netlify dev` is easier, but randomly crashes with a socket closed error message. So instead, I run the app and lambda server individually

```
posix-source .env && export FAUNA_DB_KEY=$FAUNA_DB_KEY && export INSTAGRAM_ACCESS_TOKEN=$INSTAGRAM_ACCESS_TOKEN && yarn start:lambda
posix-source .env && export FAUNA_DB_KEY=$FAUNA_DB_KEY && export INSTAGRAM_ACCESS_TOKEN=$INSTAGRAM_ACCESS_TOKEN && yarn start:app
```

## Misc

### Inspiration

- https://codesandbox.io/s/app-store-ui-using-react-and-framer-motion-ecgc2
- TailwindCSS (largely lifted the box-shadow styling)
