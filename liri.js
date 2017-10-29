const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

const keys = require('./keys.js');
const logger = require('./logger.js');

const twitterKeys = keys.twitterKeys;
const omdbKey = keys.omdbKey;
const spotifyKeys = keys.spotifyKeys;

const client = new twitter(twitterKeys);
const spotifyApp = new spotify(spotifyKeys);

const command = process.argv[2];

switch (command) {
    case 'my-tweets':
        let params = { screen_name: 'erfaanism2' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                let maxIndex = 20;
                if (tweets.length < 20) {
                    maxIndex = tweets.length;
                };
                for (let index = 0; index < maxIndex; index++) {
                    let thisTweet = tweets[index];
                    let result = `Tweet #${index + 1}:\nDate: ${thisTweet.created_at}\nTweet content: ${thisTweet.text}\n`;
                    console.log(logger.addLog('Twitter', result));
                }
            } else {
                console.log(JSON.stringify(error));
            }
        });
        break;
    case 'spotify-this-song':
        if (process.argv[3]) {
            let query = process.argv[3];
            spotifyApp.search({
                    type: 'track',
                    query,
                    limit: 1
                })
                .then(function(response) {
                    let artist = response.tracks.items[0].artists[0].name;
                    let name = response.tracks.items[0].name;
                    let preview = response.tracks.items[0].preview_url;
                    let album = response.tracks.items[0].album.name;
                    let result = `Artist(s): ${artist}\nSong Name: ${name}\nPreview Link: ${preview}\nAlbum: ${album}`;
                    console.log(logger.addLog('Spotify', result));
                })
                .catch(function(e) {
                    console.log(JSON.stringify(e));
                })
        } else {
            let query = 'The Sign Ace of Base';
            spotifyApp.search({
                    type: 'track',
                    query,
                    limit: 1
                })
                .then(function(response) {
                    let artist = response.tracks.items[0].artists[0].name;
                    let name = response.tracks.items[0].name;
                    let preview = response.tracks.items[0].preview_url;
                    let album = response.tracks.items[0].album.name;
                    let result = `Artist(s): ${artist}\nSong Name: ${name}\nPreview Link: ${preview}\nAlbum: ${album}`;
                    console.log(logger.addLog('Spotify', result));
                })
                .catch(function(e) {
                    console.log(JSON.stringify(e));
                })
        }
        break;
    case 'movie-this':

        break;
    case 'do-what-it-says':

        break;
}