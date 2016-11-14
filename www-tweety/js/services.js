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
        var index = this.findTweetIndexById(id);
        if(index == -1) {
            return null;
        }
        return this._tweetsData.tweets[index];
    },
    "addTweet": function(tweet) {
        if(tweet != null && (tweet.id == undefined || this.getTweetById(tweet.Id) == null)) {
            tweet.Id = Utils.guid();
            tweet.CreatedAt = new Date().getTime();
            this._tweetsData.tweets.push(tweet);
            this.save();
            return tweet;
        }
        return null;
    },
    "updateTweet": function(tweet) {
        var index = this.findTweetIndexById(tweet.Id);
        if(index == -1) {
            return false;
        }
        tweet.UpdatedAt = new Date().getTime();
        this._tweetsData.tweets[index] = tweet;
        this.save();
        return true;
    },
    "deleteTweet": function(id) {
        var index = this.findTweetIndexById(tweet.Id);
        if(index == -1) {
            return false;
        }
        this._tweetsData.tweets.splice(index, 1);
        this.save();
        return true;
    },
    "softDeleteTweet": function(id) {
        var index = this.findTweetIndexById(id);
        if(index == -1) {
            return false;
        }
        var tweet = this._tweetsData.tweets[index];
        tweet.UpdatedAt = new Date().getTime();
        tweet.DeletedAt = new Date().getTime();
        this._tweetsData.tweets[index] = tweet;
        this.save();
        return true;
    },
    "softUnDeleteTweet": function(id) {
        var index = this.findTweetIndexById(id);
        if(index == -1) {
            return false;
        }
        var tweet = this._tweetsData.tweets[index];
        tweet.UpdatedAt = new Date().getTime();
        tweet.DeletedAt = null;
        this._tweetsData.tweets[index] = tweet;
        this.save();
        return true;
    },
    "findTweetIndexById": function(id) {
        var tweets = this.getTweets();
        if(tweets == null) {
            return -1;
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
            return -1;
        }
        return i;
    },
    "save": function() {
        Utils.store(this._connString, this._tweetsData);
        return true;
    }
};