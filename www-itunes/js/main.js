;(function() {
  
  function ITunesApp() {

    // URL of the Search API
    this.API_URL_PREFIX = 'https://itunes.apple.com/search?term=';
    this.API_URL_SUFFIX = '&entity=album&callback=json_callback';
    // The results within the JSON-object
    this.results;
    // Interface elements
    this.txtSearchElement;
    this.btnSearchElement;

    // Initialize App
    this.init = function() {
      console.log('1. Initialize the app');

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
      // Hack --> Closure
      var that = this;
      console.log('2. Load the Data');

      var API_URL = this.API_URL_PREFIX + artist.replace(' ', '%2B') + this.API_URL_SUFFIX;

      Utils.getJSONPByPromise(API_URL).then(
        function(data) {
          that.results = data.results;
          that.updateUI();
        },
        function(error) {
          console.log(error);
        }
      );

    };

    // Update the User Interface (UI)
    this.updateUI = function() {
      console.log('3. Update UI');
      this.generateCards();
    };

    // Generate the albums as a table with rows
    this.generateTableUI = function() {
      console.log('4. Generate UI with table-element');
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
    };

    // Generate the albums as a set of cards
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
  // Initialize the app
  app.init();

})();