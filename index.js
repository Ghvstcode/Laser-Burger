const Twit = require('twit')
const search = require('./src/search')
const config = require('./config/config')

const T = new Twit(config)//Create an instance of the twit package


const stream = T.stream('statuses/filter', { track: '@Whatsongslyrics' })//Track for mentions
stream.on('tweet', tweetEvent)

//Callback function that should run when someone mentions 
function tweetEvent(eventMsg, error) {
    //Check if the mention is as a reply to another tweet
   const string = eventMsg.in_reply_to_status_id_str

    if (string===null) {
        const mentionTweet = eventMsg.text

        const findSongWithLyricMention = mentionTweet.replace('@whatsongslyrics', '') //check this out when changing username
        search(findSongWithLyricMention, eventMsg) 
    } else {
        T.get('statuses/show/:id',{ id: string },(err,response) => {
            const findSongWithLyric = response.text
            search(findSongWithLyric, eventMsg)

        })
    }
    
    if(error) {
        throw new Error("encountered an error")
    }
}


module.exports = {
    tweetEvent
}


