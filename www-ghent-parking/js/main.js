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
    // UI generated
    this._uiGenerated = false;

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
              data = data.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
              that._parkingStates = data;
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

    // Update the User Interface (UI)
    this.updateUI = function() {
      console.log('3. Update UI');

      if(!this._uiGenerated) {
        // Call the function generateTableUI
        this.generateTableUI();
      } else {
        
      }
      
    };

    // Generate the albums as a table with rows
    this.generateTableUI = function() {
      console.log('4. Generate UI with table-element');
      
      var tempStr = '';
      tempStr += '<ul class="demo-list-three mdl-list">';
      for(var i=0;i<this._parkingStates.length;i++) {
        var parking = this._parkingStates[i];
        tempStr += '<li class="mdl-list__item mdl-list__item--three-line" data-id="' + parking.name.split(' ')[0] + '">';
        tempStr += '<span class="mdl-list__item-primary-content">';
        tempStr += '<i class="material-icons mdl-list__item-avatar parking__color-state ' + this.convertStateToColorStateClass(parking.parkingStatus.availableCapacity, parking.parkingStatus.totalCapacity) + '"></i>';
        tempStr += '<span>' + parking.description + '</span>';
        tempStr += '<span class="mdl-list__item-text-body">';
        tempStr += parking.name.split(' ')[0];
        tempStr += '</span>';
        tempStr += '</span>';
        tempStr += '<span class="mdl-list__item-secondary-content parking__state">';
        tempStr += parking.parkingStatus.availableCapacity;
        tempStr += '</span>';
        tempStr += '</li>';
      };
      tempStr += '</ul>';

      document.querySelector('.parking-results').innerHTML = tempStr;
      
    };

    this.convertStateToColorStateClass = function(available, total) {
      var perc = Math.round((available / total) * 100);
      console.log(perc);
      if(perc >= 60) {
        return 'parking__color-state--green';
      } else if(perc < 60 && perc >= 20) {
        return 'parking__color-state--orange';
      } else {
        return 'parking__color-state--red';
      }
    };

  };

  // Make an instance of the Parking
  var app = new Parking();
  // Initialize the app
  app.init();

});