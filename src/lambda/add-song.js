const axios = require("axios");

/*
We can POST from ios shortcuts and construct a request body

event.body ->
    name
    artist
    itunes url

additional data required:
    album artwork url (can probably get from itunes)
    spotify url (hit another api? async update object after it's created?)
    data added

NOTE: Use promise.all to wait for the final data then write?
db document to write:
    name
    artist
    itunes url
    spotify url
    artwork url (or blob)
    date added

With that data, we need to get the spotify url.
We also need to get the album artwork.

Return:
    success -> URL of post
    error -> Error text

*/

async function getSpotifyURL(name, artist) {
  console.log('Function `getSpotifyURL` invoked', name, artist);
  const spotifyEndpoint = "http://spotify-car-play.herokuapp.com/search";
  const target = `${spotifyEndpoint}/${name}+${artist}/track`;
  try {
    const response = await axios.get(target);
    // if response.data is empty, should be an error?
    
    console.log(response);
    const uri  = response.data.tracks[0].uri;
    const spotifyURL = uri.replace("spotify:track:", "https://open.spotify.com/track/");
  
    return spotifyURL;
  } catch(error) {
    // return Promise.reject("Not found");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      console.error("SpotifyURL not found", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error!', error);
    }
    
  }
  

}

export async function handler(event, context) {
  // const spotifyEndpoint = "http://spotify-car-play.herokuapp.com/search";
  const data = JSON.parse(event.body);
  console.log('Function `add-song` invoked', data)
  const { name, artist } = data;
  try {

    // an array is returned and we only want the first item
    // const uri  = response.data.tracks[0].uri;
    // const spotifyURL = uri.replace("spotify:track:", "https://open.spotify.com/track/");
    const spotifyURL = await getSpotifyURL(name, artist);
    // console.log(spotifyURL);
    
    return {
      statusCode: 200,
      // first, convert the json response to js object
      // then, extract only the data we want from that object
      body: JSON.stringify({artist, name, spotifyURL: spotifyURL || null})
    }
    /* http://spotify-car-play.herokuapp.com/search/Couples%20Therapy+Tylo%20$mith/track
    returns: 
    {"tracks":[{"name":"Couples Therapy","uri":"spotify:track:1uJIBwy9rQ94eT1Bo93ivf","album":"Bingewatch","artists":"Tylo $mith"}]}

    then, replace 'spotify:track' with https://open.spotify.com/track/
    https://open.spotify.com/track/1uJIBwy9rQ94eT1Bo93ivf
    */
    // curl -X GET "https://api.spotify.com/v1/search?q=upc:00602537817016&type=album" -H "Authorization: Bearer {your access token}"
  } catch (err) {
    // console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
