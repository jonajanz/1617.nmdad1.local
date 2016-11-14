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
        tempStr += '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" data-id="' + event.id + '" data-language="' + event.language + '">';
        tempStr += '<header class="mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">';
        tempStr += '<picture class="event__picture"><img src="' + event.images[0] + '" /></picture>';
        tempStr += '<section class="event_openinghours">' + event.openinghours_short + '</span>';
        if(event.category != null && event.category.length > 0) {
          tempStr += '<ul class="event__categories">';
          for(var c=0;c<event.category.length;c++) {
            var category = event.category[c];
            tempStr += '<li data-cid="' + category.tid + '">' + category.name + '</li>';
          }
          tempStr += '</ul>';
        }
        if(event.prices != null && event.prices.length > 0) {
          tempStr += '<ul class="event__prices">';
          for(var c=0;c<event.prices.length;c++) {
            var price = event.prices[c];
            tempStr += '<li>' + price.type + ': ' + price.price + ' €</li>';
          }
          tempStr += '</ul>';
        }
        tempStr += '</header>';
        tempStr += '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">';
        tempStr += '<div class="mdl-card__supporting-text">';
        tempStr += '<h4>' + event.title + '</h4>';
        tempStr += '<blockquote>' + event.summary + '</blockquote>';
        tempStr += event.description;
        tempStr += '</div>';
        tempStr += '<div class="mdl-card__actions">';
        if(event.contact != null && event.contact.length > 0) {
          tempStr += '<ul class="event__contacts">';
          for(var c=0;c<event.contact.length;c++) {
            var contact = event.contact[c];
            tempStr += '<li>' 
            tempStr += contact.contact;
            tempStr += '<br>' + contact.street + ((contact.number != null)?' '+contact.number:'');
            tempStr += '<br>' + contact.city;
            if(contact.phone != null && contact.phone.length > 0) {
              for(var p=0;p<contact.phone.length;p++) {
                var phone = contact.phone[p];
                tempStr += '<br>' + phone.number;
              }
            }
            if(contact.email != null && contact.email.length > 0) {
              for(var e=0;e<contact.email.length;e++) {
                var email = contact.email[e];
                tempStr += '<br>' + '<a href="mailto:' + email + '?subject=Contact via AHS">' + email + '</a>';
              }
            }
            if(contact.website != null && contact.website.length > 0) {
              for(var w=0;w<contact.website.length;w++) {
                var website = contact.website[w];
                tempStr += '<br>' + '<a href="' + website.url + '" title="' + website.title + '">' + website.title + '</a>';
              }
            }
            tempStr += '</li>';
          }
          tempStr += '</ul>';
        }
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