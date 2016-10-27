function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    function VisitGhentApp() {

    // URL of the Search API
    this.API_URL = 'https://datatank.stad.gent/4/toerisme/visitgentevents.json?callback=json_callback';
    // The results within the JSON-object
    this._visitGentEvents;
    // UI generated
    this._uiGenerated = false;

    // Initialize App
    this.init = function() {
      console.log('1. Initialize the app');

      this.loadData();
    }

    // Load the data from the API
    this.loadData = function() {
      console.log('2. Load the Data');

      var that = this;// Hack --> Closure

      var xhr = new XMLHttpRequest();
      xhr.open('get', this.API_URL, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
          if(xhr.status == 200) {
              var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
              /*data = data.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });*/
              that._visitGentEvents = data;
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

      if(!this._uiGenerated) {
        this.generateCardsUI(); // Call the function generateCardsUI
        this._uiGenerated = true;
      }

    };

    // Generate the albums as a table with rows
    this.generateCardsUI = function() {
      console.log('4. Generate UI with cards');

      var tempStr = '';
      for(var i=0;i<this._visitGentEvents.length;i++) {
        var event = this._visitGentEvents[i];
        /*tempStr += '<li class="mdl-list__item mdl-list__item--three-line" data-id="' + event.id + '" data-language="' + event.language + '">';
        tempStr += '<span class="mdl-list__item-primary-content">';
        tempStr += '<i class="material-icons mdl-list__item-avatar event__thumb"><img src="' + event.thumbs[0] + '" /></i>';
        tempStr += '<span>' + event.title + '</span>';
        tempStr += '<section class="mdl-list__item-text-body">' +  '<section class="event__summary">' + event.summary + '</section>' + '<section class="event__description">' + event.description + '<section>' + '</section>';
        tempStr += '</span>';
        tempStr += '<span class="mdl-list__item-secondary-content parking__state">';
        tempStr += '</span>';
        tempStr += '</li>';*/
        tempStr += '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" data-id="' + event.id + '" data-language="' + event.language + '">';
        tempStr += '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">';
        tempStr += '<picture class="event__picture"><img src="' + event.images[0] + '" /></picture>';
        tempStr += '</header>';
        tempStr += '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">';
        tempStr += '<div class="mdl-card__supporting-text">';
        tempStr += '<h4>' + event.title + '</h4>';
        tempStr += '<blockquote>' + event.summary + '</blockquote>';
        tempStr += event.description;
        tempStr += '</div>';
        tempStr += '<div class="mdl-card__actions">';
        tempStr += '<span>' + event.openinghours_short + '</span>';
        tempStr += '</div>';
        tempStr += '</div>';
        tempStr += '<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn1">';
        tempStr += '<i class="material-icons">more_vert</i>';
        tempStr += '</button>';
        tempStr += '<ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn1">';
        tempStr += '<li class="mdl-menu__item">Lorem</li>';
        tempStr += '<li class="mdl-menu__item" disabled>Ipsum</li>';
        tempStr += '<li class="mdl-menu__item">Dolor</li>';
        tempStr += '</ul>';
        tempStr += '</section>';
      };
      document.querySelector('.visitgentevents-results').innerHTML = tempStr;
    };
  };

  var app = new VisitGhentApp(); // Make an instance of the VisitGhentApp
  app.init(); // Initialize the app

});