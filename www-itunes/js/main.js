;(function() {
  
  function ITunesApp() {

    // Use Yahoo as a reverse proxy solve CORS (Cross Origin Resource Sharing problems)
    this.API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fitunes.apple.com%2Fsearch%3Fterm%3Ddaft%2Bpunk%22&format=json&diagnostics=true&callback=';
    this.results;

    // Load the data from the API (iTunes)
    this.loadData = function() {
      // Hack
      var that = this;
      // Define a XMLHttpRequest object in order to load data
      var xhr = new XMLHttpRequest();
      // 1. Open a connection to the API
      // get verb: Get the information from the end-point (READ execution)
      // Third option means asynchronous action or not
      xhr.open('get', this.API_URL, true);
      // 2. Settings
      xhr.responseType = 'json';
      // 3. Listeners
      // 3.1. onload: i received something that's not an error
      xhr.onload = function() {
        // Get the loaded data
        var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
        // Get the real results from iTunes
        this.results = data.query.results.json.results;
        // Call the updateUI() function
        that.updateUI();
      };
      // 3.2. onload: i received an error
      xhr.onerror = function() {
        console.log('Error');
      };
      // 4. Send the request
      xhr.send();
    };

    this.updateUI = function() {
      console.log('UPDATE THE UI DUDE');
    }

  };

  // Make an instance of the ITunesApp
  var app = new ITunesApp();
  app.loadData();

})();