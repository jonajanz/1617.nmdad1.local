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
      }
    };

    App.init();

});