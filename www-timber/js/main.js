;(function() {
  
  function Timber() {

    // URL of the Search API
    this.API_URL = 'http://datatank.stad.gent/4/milieuennatuur/inventarisstraatbomen1juli2011.json?callback=json_callback';
    this.FLICKR_SEARCH_API_URL_PREFIX = ' https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=46a1a4035297542b1416f6fbc4b79e4e&text='; // Do not use my key!!!
    this.FLICKR_SEARCH_API_URL_SUFFIX = '&privacy_filter=1&content_type=1&format=json';
    // The results within the JSON-object
    this._treeResults;
    this._flickrPhotos;

    // Initialize App
    this.init = function() {
      console.log('1. Initialize the app');
this.loadFlickrSearch('sla');
      // Call the function loadData
      this.loadData();
    }

    // Load the data from Ghent Data API
    this.loadData = function() {
      // Hack --> Closure
      var that = this;
      console.log('2. Load the Data');

      var xhr = new XMLHttpRequest();
      xhr.open('get', this.API_URL, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
          if(xhr.status == 200) {
              var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
              that._treeResults = data;
              that.updateUI();
          } else {
              console.log(xhr.status);
          }
      }
      xhr.onerror = function() {
          console.log(Error('Network Error!'));
      }
      xhr.send();

    };

    // Load the data from Flickr Search
    this.loadFlickrSearch = function(searchString) {
      // Hack --> Closure
      var that = this;
      console.log('2. Load the Data');

      var FLICKR_SEARCH_API_URL = this.FLICKR_SEARCH_API_URL_PREFIX + searchString.replace(' ', '%2B') + this.FLICKR_SEARCH_API_URL_SUFFIX;

      Utils.getFLICKRJSONPByPromise(FLICKR_SEARCH_API_URL).then(
        function(data) {
          that._flickrPhotos = data.photos.photo;
        },
        function(error) {
          console.log(error);
        }
      );
    };

    // Update the User Interface (UI)
    this.updateUI = function() {
      console.log('3. Update UI');

      // Call function generateTableUI
      this.generateTableUI();
    };

    // Generate the albums as a table with rows
    this.generateTableUI = function() {
      console.log('4. Generate UI with table-element');
      var tempStr = '';
      tempStr += '<div class="mdl-cell mdl-cell--12-col parking-results">';
      tempStr += '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">'
      tempStr += '<thead>';
      tempStr += '<tr>';
      tempStr += '<th>Straat</th>';
      tempStr += '<th>Boomsoort</th>';
      tempStr += '<th>Aantal</th>';
      tempStr += '<th>Omtrek (cm)</th>';
      tempStr += '</tr>';
      tempStr += '</thead>';
      tempStr += '<tbody>';
      for(var i=0;i<this._treeResults.length;i++) {
        var tree = this._treeResults[i];
        tempStr += '<tr>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + tree.Straatnamenlijst + '</td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + tree.boomsoorten + '</td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + tree.aantal + '</td>';
        tempStr += '<td class="mdl-data-table__cell--non-numeric">' + tree.omtrek + ' </td>';
        tempStr += '</tr>';
      };
      tempStr += '</tbody>';
      tempStr += '</table>';
      tempStr += '</div>';
      document.querySelector('.timber-results').innerHTML = tempStr;
    };

    // Generate the albums as a set of cards
    this.generateCards = function() {
      /*var tempStr = '';
      
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
      document.querySelector('.itunes-results').innerHTML = tempStr;*/
    }

  };

  // Make an instance of the Timber
  var app = new Timber();
  // Initialize the app
  app.init();

})();