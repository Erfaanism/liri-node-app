const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
const keys = require('./keys.js');

const twitterKeys = keys.twitterKeys;
const omdbKey = keys.omdbKey;
const spotifyKeys = keys.spotifyKeys;

const client = new twitter(twitterKeys);



var params = { screen_name: 'erfaanism2' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(JSON.stringify(tweets));
    } else {
        throw JSON.stringify(error)
    }
});