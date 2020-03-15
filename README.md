I would like to introduce yall to (@whatsongslyrics) a Twitter bot I built with node.js and the audd music recognition API. 
**********************What does it do?*********************
-When mentioned it gives the name of the song that contains the tweet as a lyric. For example, if I tweet at it with excerpts of the lyric 
-when mentioned as a reply to another  tweet it takes the parent tweet as the lyric excerpt and attempts to find the song containing those lyrics 
**********************How does it work? *****************
To get the title of a song using (@whatsongslyrics) you could;
-Tweet at it with the lyrics excerpt in the tweet and it would tell you the name of the song
-Mention it as a reply, you don't have to provide any additional information, even if you do it won't be read,i.e The bot will use the tweet you mentioned it to as the lyrics excerpt and provide a result based on it!
when you mention the bot either as a reply or a tweet the bot doesn't reply to you instead, it creates a new tweet that mentions you, says the name of the song and the lyric excerpt which the bot used to get the song name in a bracket. i understand that some people don't want to be disturbed with notifications or want their tweets to have engagements and that's why I built the bot this way     **********************Arrrrrgh,Bugs****************************
you might experience some "errors" while using this beautiful bot, I'll try to explain the reason why in this section. When you mention the bot to a tweet and provide lyric excerpts, the result might not be the song you expect but it ALWAYS will contain the tweets as lyrics. The reason is that the song data is fetched from an API and the API might return several song data but only one of these songs is shown to the person that makes the request. Also if you don't get any results a song with those lyrics wasn't found and hence no song name
**********************Stack,Tools & Resources*****************
-Node.js
-Twit npm package
-Github
-Heroku
-The coding train channel

I'll make this package open so you could make pr's and help write test's and add to the documentation
