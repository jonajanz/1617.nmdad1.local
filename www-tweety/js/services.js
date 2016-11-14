/*
TweetsDbContext
---------------
1) DataBase transactions: CRUD (Create, Read, Update, Delete)
2) Caching
*/
var TweetsDbContext = {
    "init": function(connString) {
        this._connString = connString; // Save connection string in local variable
        this._tweetsData = {
            "info": {
                "title": "Tweets Application",
                "version": "1.0",
                "modified": "2016/11/14",
                "author": "Philippe De Pauw - Waterschoot"
            },
            "tweets": [],
            "settings": {}
        };
        // Get the stored data. If not present store the _tweetsData into the localstorage.
        if(Utils.store(this._connString) != null) {
            this._tweetsData = Utils.store(this._connString);
        } else {
            Utils.store(this._connString, this._tweetsData);
        }
    },
    "getTweets": function() {
        var tweets = this._tweetsData.tweets;
        if(tweets == null || (tweets != null && tweets.length == 0)) {
            return null;
        }
        return tweets;
    },
    "getTweetById": function(id) {
        var tweets = this.getTweets();
        if(tweets == null) {
            return null;
        }

        var match = false, i = 0, tweet = null;
        while(!match && i < tweets.length) {
            tweet = tweets[i];
            if(tweet.Id == id) {
                match = true;
            } else {
                i++;
            }
        }

        if(!match) {
            return null;
        }
        return tweet;
    }
};