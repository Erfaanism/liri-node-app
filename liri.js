const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

const keys = require('./keys.js');
const logger = require('./logger.js');
const it = require('./it.js')

const twitterKeys = keys.twitterKeys;
const omdbKey = keys.omdbKey;
const spotifyKeys = keys.spotifyKeys;

const client = new twitter(twitterKeys);
const spotifyApp = new spotify(spotifyKeys);

var command = process.argv[2];
var argument = '';

if (process.argv[3]) {
    argument = process.argv[3];
}

var runApp = (cmd, arg) => {
    switch (cmd) {
        case 'my-tweets':
            let params = { screen_name: 'erfaanism2' };
            client.get('statuses/user_timeline', params, (error, tweets, response) => {
                if (!error) {
                    let maxIndex = 20;
                    if (tweets.length < 20) {
                        maxIndex = tweets.length;
                    };
                    let result = [];
                    for (let index = 0; index < maxIndex; index++) {
                        let thisTweet = tweets[index];
                        result.push(`Tweet #${index + 1}:\nDate: ${thisTweet.created_at}\nTweet content: ${thisTweet.text}\n`)
                    }
                    console.log(`LIRI: here is my programmer's latest 20 tweets:\n${logger.addLog('Twitter', result)}`);
                } else {
                    console.log(`LIRI: I cannot connect to Twitter, please contact my programmer at erfaanism@gmail.com:\n${JSON.stringify(error)}`);
                }
            });
            break;
        case 'spotify-this-song':
            let query = 'The Sign Ace of Base';
            if (argument) {
                query = argument;
            }
            spotifyApp.search({
                    type: 'track',
                    query,
                    limit: 1
                })
                .then((response) => {
                    let artist = response.tracks.items[0].artists[0].name;
                    let name = response.tracks.items[0].name;
                    let preview = response.tracks.items[0].preview_url;
                    let album = response.tracks.items[0].album.name;
                    let result = `Artist(s): ${artist}\nSong Name: ${name}\nPreview Link: ${preview}\nAlbum: ${album}`;
                    console.log(`LIRI: here is what I found for your song:\n${logger.addLog('Spotify', result)}`);
                })
                .catch((error) => {
                    console.log(`LIRI: I cannot connect to Spotify, please contact my programmer at erfaanism@gmail.com:\n${JSON.stringify(error)}`);
                })
            break;
        case 'movie-this':
            let movie = encodeURIComponent('Mr. Nobody');
            if (argument) {
                movie = encodeURIComponent(argument);
            }
            request(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${movie}`, (error, response, body) => {
                if (!error) {
                    try {
                        let jsonBody = JSON.parse(body);
                        let result = `Title: ${jsonBody.Title}\nYear: ${jsonBody.Year}\nIMDB Rating: ${jsonBody.Ratings[0].Value}\nRottent Tomatoes Rating: ${jsonBody.Ratings[1].Value}\nCountry: ${jsonBody.Country}\nLanguage: ${jsonBody.Language}\nPlot: ${jsonBody.Plot}\nActors: ${jsonBody.Actors}`;
                        console.log(`LIRI: here is what I found for your movie:\n${logger.addLog('Movies', result)}`);
                    } catch (e) {
                        console.log('LIRI: Please be more specific, the information does not seem to be valid');
                    }
                } else {
                    console.log(`LIRI: I cannot connect to OMDB, please contact my programmer at erfaanism@gmail.com:\n${error}`);
                }
            });
            break;
        case 'do-what-it-says':
            command = it[0];
            argument = it[1];
            if (command !== 'do-what-it-says') {
                runApp(command, argument)
            } else {
                console.log('LIRI: This will make me to go into an infinite loop!\nPlease fix random.txt');
            }
            break;
        default:
            console.log('LIRI: I cannot process your request.\nPlease read the instruction on https://github.com/Erfaanism/liri-node-app');
            break;
    }
}

runApp(command, argument);