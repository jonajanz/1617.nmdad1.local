;(function() {
  
  function ITunesApp() {

    // Use Yahoo as a reverse proxy solve CORS (Cross Origin Resource Sharing problems)
    this.API_URL_PREFIX = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fitunes.apple.com%2Fsearch%3Fterm%3D';
    this.API_URL_SUFFIX = '%26entity%3Dalbum%22%20&format=json&diagnostics=true&callback=';
    this.txtSearchElement;
    this.btnSearchElement;
    this.results;

    // Initialize App
    this.init = function() {
      // Hack
      var that = this;

      // Search Textfield
      this.txtSearchElement = document.querySelector('#txt-search');

      // Search Button Listener
      this.btnSearchElement = document.querySelector('.btn-search');
      this.btnSearchElement.addEventListener('click', function() {
        that.loadData(that.txtSearchElement.value);
      }, false);
    }

    // Load the data from the API (iTunes)
    this.loadData = function(artist) {

      artist = artist.replace(' ', '%2B');
      console.log

      // API_URL
      var API_URL = this.API_URL_PREFIX + artist + this.API_URL_SUFFIX;

      // Hack
      var that = this;
      // Define a XMLHttpRequest object in order to load data
      var xhr = new XMLHttpRequest();
      // 1. Open a connection to the API
      // get verb: Get the information from the end-point (READ execution)
      // Third option means asynchronous action or not
      xhr.open('get', API_URL, true);
      // 2. Settings
      xhr.responseType = 'json';
      // 3. Listeners
      // 3.1. onload: i received something that's not an error
      xhr.onload = function() {
        // Get the loaded data
        var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
        // Get the real results from iTunes
        that.results = data.query.results.json.results;
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
      this.generateTable();
    }

    this.generateTable = function() {
      var tempStr = '';
      tempStr += '<div class="mdl-cell mdl-cell--12-col itunes-results">';
      tempStr += '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">'
      tempStr += '<thead>';
      tempStr += '<tr>';
      tempStr += '<th class="mdl-data-table__cell--non-numeric">Album</th>';
      tempStr += '<th></th>';
      tempStr += '<th>Artist</th>';
      tempStr += '<th>Genre</th>';
      tempStr += '<th>Price</th>';
      tempStr += '</tr>';
      tempStr += '</thead>';
      tempStr += '<tbody>';
      for(var i=0;i<this.results.length;i++) {
        var album = this.results[i];
        tempStr += '<tr>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric"><img src="' + album.artworkUrl60 + '" /></td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + album.collectionName + '</td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + album.artistName + '</td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + album.primaryGenreName + '</td>';
        tempStr += '<td class="mdl-data-table__cell--numeric">' + album.collectionPrice + ' ' + album.currency + '</td>';
        tempStr += '</tr>';
      };
      tempStr += '</tbody>';
      tempStr += '</div>';
      document.querySelector('.itunes-results').innerHTML = tempStr;
    }

    this.generateCards = function() {
      var tempStr = '';
      
      for(var i=0;i<this.results.length;i++) {
        var album = this.results[i];
        tempStr += '<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col" style>';
        tempStr += '<figure class="mdl-card__media">';
        tempStr += '<img src="' + album.artworkUrl60 +'" alt="" />';
        tempStr += '</figure>';
        tempStr += '<div class="mdl-card__title">';
        tempStr += '<h2 class="mdl-card__title-text">' + album.collectionName + '</h2>';
        tempStr += '</div>';
        tempStr += '<div class="mdl-card__supporting-text">';
        tempStr += album.artistName;
        tempStr += '</div>';
        tempStr += '</div>';
      };
      document.querySelector('.itunes-results').innerHTML = tempStr;
    }

  };

  // Make an instance of the ITunesApp
  var app = new ITunesApp();
  app.init();

})();