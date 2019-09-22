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

export async function handler(event, context) {
  const spotifyEndpoint = "http://spotify-car-play.herokuapp.com/search";
  const data = JSON.parse(event.body);
  console.log('Function `add-song` invoked', data)
  const { name, artist } = data;
  try {
    const target = `${spotifyEndpoint}/${name}+${artist}/track`;
    const response = await axios.get(target);
    console.log(response.data.tracks)

    // an array is returned and we only want the first item
    const uri  = response.data.tracks[0].uri;
    const spotifyURL = uri.replace("spotify:track:", "https://open.spotify.com/track/");

    console.log(spotifyURL);
    return {
      statusCode: 200,
      // first, convert the json response to js object
      // then, extract only the data we want from that object
      body: JSON.stringify({artist, name, spotifyURL})
    }
    /* http://spotify-car-play.herokuapp.com/search/Couples%20Therapy+Tylo%20$mith/track
    returns: 
    {"tracks":[{"name":"Couples Therapy","uri":"spotify:track:1uJIBwy9rQ94eT1Bo93ivf","album":"Bingewatch","artists":"Tylo $mith"}]}

    then, replace 'spotify:track' with https://open.spotify.com/track/
    https://open.spotify.com/track/1uJIBwy9rQ94eT1Bo93ivf
    */
    // curl -X GET "https://api.spotify.com/v1/search?q=upc:00602537817016&type=album" -H "Authorization: Bearer {your access token}"
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
