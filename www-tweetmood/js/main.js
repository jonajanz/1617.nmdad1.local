function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
      "init": function() {
        this._tweetsDbContext = TweetsDbContext; // Create a reference to the TweetsDbContext object
        this._tweetsDbContext.init('ahs.dds.tweetmood'); // Initialize the DbContext file with connection string (namespace) as value
        
			  this._frmTweetCreate = document.querySelector('#frm-tweet-create'); // Cache Create Tweet Form
        this._listTweets = document.querySelector('.list-tweets'); // Cache Tweets List

        this.registerEventListeners(); // Register all events for all active UI elements
        this.updateUITweetsList(); // Update UI: Tweets List
      },
      "registerEventListeners": function() {

        // Begin: Register Event Listeners for #frm-tweet-create form
        if(this._frmTweetCreate != null) {
				
          var self = this; // Hack for this within an event listener of another object
          
          this._frmTweetCreate.querySelector('#txtTweetContent').addEventListener('input', function(ev) {
            var str = this.value;
            Utils.trim(str);
            self.updateUITweetCharsAmount(str);
          });
          
          this._frmTweetCreate.addEventListener('submit', function(ev) {

            ev.preventDefault();
            
            var rdbtnGroupMood = document.querySelector('.rdbgMood input[type="radio"]:checked'); // Get selected value of RadioButtonGroup
            
            var tweet = new Tweet(); // Create a new Tweet Object
            tweet.Content = Utils.trim(this.querySelectorAll('[name="txtTweetContent"]')[0].value);
            tweet.Mood = (rdbtnGroupMood != null)?self.convertMoodStringToMood(rdbtnGroupMood.value):Moods.HAPPY;
        
            // Add Tweet via the DbContext to the store
            var addedTweet = self._tweetsDbContext.addTweet(tweet);
            if(addedTweet != null) {
              self.updateUITweetsList();
            }
            
            return false;

          });
        }// End: Register Event Listeners for #frm-tweet-create form

      },
      "updateUITweetCharsAmount": function(strContent) {

        if(this._frmTweetCreate != null) {
          this._frmTweetCreate.querySelector('.tweetContentAmount').innerHTML = 280 - strContent.length;
        }

      },
      "updateUITweetsList": function() {

        var tweets = this._tweetsDbContext.getTweets(); // Get all tweets

        if(tweets != null) {

          var strHTML = '', tweet = null;
          for(var i=0; i < tweets.length;i++) {
            tweet = tweets[i];
            strHTML += '<div class="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone  mdl-shadow--2dp tweet' + ((tweet.DeletedAt != null)?' tweet--softdeleted':'') + '" data-id="' + tweet.Id + '">';
            strHTML += '<div class="mdl-card__supporting-text">';
            strHTML += '<h4>' + tweet.Content + '</h4>';
            strHTML += '</div>';
            strHTML += '<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn-' + tweet.Id + '">';
            strHTML += '<i class="material-icons">more_vert</i>';
            strHTML += '</button>';
            strHTML += '<ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn-' + tweet.Id + '">';
            strHTML += '<li class="mdl-menu__item">Edit</li>';
            strHTML += '<li class="mdl-menu__item">Softdelete</li>';
            strHTML += '<li class="mdl-menu__item">Delete</li>';
            strHTML += '</ul>';
            strHTML += '</div>';
          }
          this._listTweets.innerHTML = strHTML;
          componentHandler.upgradeAllRegistered(); // Update Material Design Event Listeners for all new elements into the DOM
        }

      },
      "convertMoodStringToMood": function(strMood){

        switch(strMood){
          case 'Neutral':return Moods.NEUTRAL;
          case 'Happy':return Moods.HAPPY;
          case 'Sad':return Moods.SAD;
          default:return Moods.NEUTRAL;
        }

      },
      "unitTestTweets": function() {
        // TEST
        /*
        CREATE TWEET
        var tweet = new Tweet();
        tweet.Content = 'The debates, especially the second and third, plus speeches and intensity of the large rallies, plus OUR GREAT SUPPORTERS, gave us the win!';
        tweet.Mood = Moods.HAPPY;
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
      }
    };

    App.init();

});