;(function() {

    // Define an object constructor YouTubeApp without arguments
    function YouTubeApp() {

        // YouTube API Search URL
        this.API_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?q=cat&part=snippet&key=AIzaSyCNxWgu7Z8_hOBq3GoRwWL_TeDFFPeZw_A';

        // Define a function which initialize the app
        this.init = function() {
            console.log('1. Initialize the application');
            // Call the loadData() function
            this.loadData();
        };

        // Define a function which loads the data from the YouTube API
        this.loadData = function() {
            // Hack --> Closures
            var that = this;

            console.log('2. Load the data from the API');
            // Make an instance of the XMLHttpRequest object constructor in order to call the API
            var xhr = new XMLHttpRequest();
            // 2.1. Open a connection to the API-endpoint
            // first argument : get verb: Get the information from the API-endpoint (READ execution)
            // second argument: URL we want to call
            // third argument : asynchronous action or not (bool or Boolean)
            xhr.open('get', this.API_SEARCH_URL, true);
            // 2.2. Settings
            xhr.responseType = 'json';
            // 2.3. Register the listeners
            // 2.3.1. onload: I received something that's not an error
            xhr.onload = function() {
                // Get the loaded data and transform to a literal object
                var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                console.log(data.pageInfo.totalResults);
                // Call the updateUI function
                that.updateUI();
            };
            // 2.3.2. onerror: I received something that's an error
            xhr.onerror = function() {
                console.log('ERROR');
            };
            // 2.4. Send the request to the API-endpoint
            xhr.send();
        };

        //Define a function which transforms the loaded data into elements and inject it into the DOM
        this.updateUI = function() {
            console.log('3. Transforms the loaded data into the DOM');
        };

    }; 

    // Make an instance of the YouTubeApp object constructor
    var ytApp = new YouTubeApp();
    // Call the function init from the ytApp object
    ytApp.init();

})();