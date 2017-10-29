const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

const keys = require('./keys.js');
const logger = require('./logger.js');

const twitterKeys = keys.twitterKeys;
const omdbKey = keys.omdbKey;
const spotifyKeys = keys.spotifyKeys;

const client = new twitter(twitterKeys);

switch (process.argv[2]) {
    case 'my-tweets':
        var params = { screen_name: 'erfaanism2' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                var maxIndex = 20;
                if (tweets.length < 20) {
                    maxIndex = tweets.length;
                };
                for (var index = 0; index < maxIndex; index++) {
                    let thisTweet = tweets[index];
                    let result = `Tweet #${index + 1}:\nDate: ${thisTweet.created_at}\nTweet content: ${thisTweet.text}\n`;
                    console.log(logger.addLog(result));
                }
            } else {
                console.log(JSON.stringify(error));
            }
        });
        break;
    case 'spotify-this-song':

        break;
    case 'spotify-this-song':

        break;
    case 'do-what-it-says':

        break;
}