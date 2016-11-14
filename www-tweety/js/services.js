/*
TweetsDbContext
---------------
1) DataBase transactions: CRUD (Create, Read, Update, Delete)
2) Caching
*/
var TweetsDbContext = {
    init: function(connString) {
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
    }
};