;(function() {

  function WeatherWidget(id, parentContainer) {
    this.API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12591774%20AND%20u%3D%22c%22&format=json&diagnostics=true&callback=';
    this.id = id;
    this.parentContainer = parentContainer;
    this.channel;

    this.loadData = function() {
      var that = this;

      Utils.getJSONPByPromise(this.API_URL).then(
        function(data) {
          that.channel = data.query.results.channel;
          that.updateUI();
        },
        function(error) {
          console.log(error);
        }
      );

    };

    this.updateUI = function() {
      var item = this.channel.item;
      var condition = item.condition;
      var forcast = item.forecast;
      var location = this.channel.location;
      var units = this.channel.units;
      var wind = this.channel.wind;

      console.log(this.channel);
    };

    this.toString = function() {
      return `Weather widget with id: ${this.id}`;
    };

  };

  var ww1 = new WeatherWidget(1, document.querySelector('.page--weather-now'));
  ww1.loadData();
  console.log(ww1.toString());

})();