`ntl dev`

or maybe:

`netlify dev -c "yarn start"`

look at this:

https://github.com/strt/www/blob/6cb0dee92fc39ed71433a92996156e34639b8b49/package.json
https://github.com/strt/www/blob/6cb0dee92fc39ed71433a92996156e34639b8b49/src/components/InstagramFeed.js

"dev": "npm-run-all --parallel dev:*",
    "dev:client": "yarn start",
    "dev:lambda": "netlify-lambda serve lambda/src -c lambda/webpack.config.js",


https://github.com/netlify/netlify-lambda#netlify-lambda-serve-legacy-command-proxying-for-local-development
https://github.com/netlify/create-react-app-lambda/blob/f0e94f1d5a42992a2b894bfeae5b8c039a177dd9/package.json
https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e
https://dev.to/abusedmedia/using-netlify-functions-to-fetch-external-files-1a4b
https://www.reddit.com/r/shortcuts/comments/d2l1o2/highresartwork_get_your_favorite_albums_artwork/
