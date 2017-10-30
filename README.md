# LIRI Node Application

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will display the information on screen using `console.log()` and also saves the data and logtype to `log.txt`. If `log.txt` is not empty, it will append the information to the file. Please see `logger.js` for more information.

### NPM and Node Modules

* [Twitter](https://www.npmjs.com/package/twitter)
* [Spotify](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [fs](https://nodejs.org/api/fs.html)

### APIs

* Twitter
* Spotify
* OMDB

### Available commands

LIRI can hanrespond to 4 different commands:

* my-tweets

* spotify-this-song

* movie-this

* do-what-it-says

#### my-tweets

`node liri.js my-tweets`

This command will show 20 of my latest tweets including the date it was posted.

#### spotify-this-song

`node liri.js spotify-this-song '<song name here>'`

This command gets a song name from user and provides the following information from Spotify:

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

#### movie-this

`node liri.js movie-this '<movie name here>'`

This command gets a song name from user and provides the following information from OMDB:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

#### do-what-it-says

`node liri.js do-what-it-says`

Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. If you enter `do-what-it-says` inside random.txt, LIRI will give you and error and will not run the command.

By default LIRI will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

Have Fun!