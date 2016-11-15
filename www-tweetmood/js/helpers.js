function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
      "init": function() {
        this._tweetsDbContext = TweetsDbContext; // Create a reference to the TweetsDbContext object
        this._tweetsDbContext.init('ahs.dds.tweety');

        // TEST
        /*
        CREATE TWEET
        var tweet = new Tweet();
        tweet.Content = 'The debates, especially the second and third, plus speeches and intensity of the large rallies, plus OUR GREAT SUPPORTERS, gave us the win!';
        tweet.Mood = Mood.HAPPY;
        var tweetAdded = this._tweetsDbContext.addTweet(tweet);
        console.log(tweetAdded);*/
        /*
        GET TWEET BY ID
        var tweet = this._tweetsDbContext.getTweetById('9e60834a-0638-49ae-a551-d9ebde322f8f');
        console.log(tweet);*/
        /*
        UPDATE A TWEET
        var tweet = this._tweetsDbContext.getTweetById('9e60834a-0638-49ae-a551-d9ebde322f8f');
        tweet.Content = 'Jeb Bush, George W and George H.W. all called to express their best wishes on the win. Very nice!';
        this._tweetsDbContext.updateTweet(tweet);
        console.log(tweet);*/
        /*
        SOFT DELETE AND UNDELETE A TWEET
        var tweet = this._tweetsDbContext.getTweetById('9e60834a-0638-49ae-a551-d9ebde322f8f');
        this._tweetsDbContext.softDeleteTweet(tweet.Id);
        console.log(tweet);
        tweet = this._tweetsDbContext.getTweetById('9e60834a-0638-49ae-a551-d9ebde322f8f');
        this._tweetsDbContext.softUnDeleteTweet(tweet.Id);
        console.log(tweet);*/
        /*
        DELETE A TWEET
        tweet = this._tweetsDbContext.getTweetById('9e60834a-0638-49ae-a551-d9ebde322f8f');
        var result = this._tweetsDbContext.deleteTweet(tweet.Id);
        console.log(result);
        */

        this.registerEventListeners(); // Register all events for all active UI elements
      },
      "registerEventListeners": function() {
        
      }
    };

    App.init();

});