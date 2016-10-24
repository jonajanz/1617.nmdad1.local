function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    function Parking() {

    // URL of the Search API
    this.API_URL = 'http://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime?callback=json_callback';
    // The results within the JSON-object
    this._parkingStates;

    // Initialize App
    this.init = function() {
      console.log('1. Initialize the app');

      this.loadData();
    }

    // Load the data from the API (iTunes)
    this.loadData = function(artist) {
       console.log('2. Load the Data');

      // Hack --> Closure
      var that = this;

      var xhr = new XMLHttpRequest();
      xhr.open('get', this.API_URL, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
          if(xhr.status == 200) {
              var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
              that._parkingStates = data;
              that.updateUI();
          } else {
              reject(status);
          }
      }
      xhr.onerror = function() {
          reject(Error('Network Error!'));
      }
      xhr.send();

    };

    // Update the User Interface (UI)
    this.updateUI = function() {
      console.log('3. Update UI');

      // Call the function generateTableUI
      this.generateTableUI();
    };

    // Generate the albums as a table with rows
    this.generateTableUI = function() {
      console.log('4. Generate UI with table-element');
      
      var tempStr = '';
      tempStr += '<ul class="demo-list-three mdl-list">';
      for(var i=0;i<this._parkingStates.length;i++) {
        var parking = this._parkingStates[i];
        tempStr += '<li class="mdl-list__item mdl-list__item--three-line">';
        tempStr += '<span class="mdl-list__item-primary-content">';
        tempStr += '<i class="material-icons mdl-list__item-avatar">person</i>';
        tempStr += '<span>' + parking.description + '</span>';
        tempStr += '<span class="mdl-list__item-text-body">';
        tempStr += parking.name.split(' ')[0];
        tempStr += '</span>';
        tempStr += '</span>';
        tempStr += '<span class="mdl-list__item-secondary-content">';
        tempStr += parking.parkingStatus.availableCapacity;
        tempStr += '</span>';
        tempStr += '</li>';
      };
      tempStr += '</ul>';

      document.querySelector('.parking-results').innerHTML = tempStr;
      
    }

  };

  // Make an instance of the Parking
  var app = new Parking();
  // Initialize the app
  app.init();

});