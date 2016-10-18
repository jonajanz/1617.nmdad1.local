;(function() {
  
  function ITunesApp() {
    this.API_URL = 'https://itunes.apple.com/search?term=daft+punk';

    // Load the data from the API (iTunes)
    this.loadData = function() {
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
        console.log('Welcome to iTunes :)');
      };
      // 3.2. onload: i received an error
      xhr.onerror = function() {
        console.log('Error');
      };
      // 4. Send the request
      xhr.send();
    };

  };

  // Make an instance of the ITunesApp
  var app = new ITunesApp();
  app.loadData();

})();