const https = require('https')
const Twit = require('twit')
const config = require('../config/config')
require('../index')

const token = process.env.api_token //Put in api keys from the lyricsearch api

const T = new Twit(config)

const search = (query,eventMsg) => {
    const from = eventMsg.user.screen_name
    const reply = eventMsg.in_reply_to_status_id

    const url = "https://api.audd.io/findLyrics/?q=" + query + "&api_token=" + token

    const request = https.request(url, (response) => {
        let data = ''
        response.on('data', (chunk) => {
            data = data + chunk.toString()
        })
    
        response.on('end', () => {
            const body = JSON.parse(data)

            if(body.status === "error" || body.result.length === 0) { //Handle Errors
               return "Cannot get data"
            }

            const partTweet = eventMsg.text //lmaoooo, this is me being a bad engineer
            const partOfTweet = partTweet.replace('@whatsongslyrics', '') //check this out when changing username
            const username = from

            var searchResult = body.result[0].full_title

            var tweet = '@' + username + '' + ' The name of the song is ' + searchResult + '[ "' + partOfTweet + '" ]';
            var tweet_for_reply = '@' + username + '' + ' The name of the song is ' + searchResult + '[ "' + query + '" ]';

            if(eventMsg.in_reply_to_status_id_str !== null) {
                T.post('statuses/update', { status: tweet_for_reply, in_reply_to_status_id: reply}, tweeted);
            } else{
                T.post('statuses/update', { status: tweet, in_reply_to_status_id: reply}, tweeted);
            }


           // Callback for when the tweet is sent
            function tweeted(err, data ) {
                if (err) {
                console.log(err);
                } else {
                console.log('Success: ' + data.text);
                }
            }
        })

        response.on('error', (e) => {
            console.error(e);
        });
    
    })
    request.end()
}

module.exports=search