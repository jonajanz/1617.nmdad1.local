;(function() {

    // Define an object constructor YouTubeApp without arguments
    function YouTubeApp() {

        // YouTube API Search URL
        this.API_SEARCH_URL_PREFIX = 'https://www.googleapis.com/youtube/v3/search?q=';
        this.API_SEARCH_URL_SUFFIX = '&part=snippet&maxResults=25&key=AIzaSyCNxWgu7Z8_hOBq3GoRwWL_TeDFFPeZw_A';
        this.results;

        // Define a function which initialize the app
        this.init = function() {
            console.log('1. Initialize the application');

            // Hack --> Closures
            var that = this;

            // Search Textfield
            this.txtSearchElement = document.querySelector('#txt-search');

            // Search Button Listener
            this.btnSearchElement = document.querySelector('.btn-search');
            this.btnSearchElement.addEventListener('click', function() {
                that.loadData(that.txtSearchElement.value);
            }, false);
        };

        // Define a function which loads the data from the YouTube API
        this.loadData = function(searchString) {
            console.log('2. Load the data from the API');

            // Hack --> Closures
            var that = this;
            // Construct the API Search URL
            var API_SEARCH_URL = this.API_SEARCH_URL_PREFIX + searchString.replace(' ', '%2B') + this.API_SEARCH_URL_SUFFIX;

            // Make an instance of the XMLHttpRequest object constructor in order to call the API
            var xhr = new XMLHttpRequest();
            // 2.1. Open a connection to the API-endpoint
            // first argument : get verb: Get the information from the API-endpoint (READ execution)
            // second argument: URL we want to call
            // third argument : asynchronous action or not (bool or Boolean)
            xhr.open('get', API_SEARCH_URL, true);
            // 2.2. Settings
            xhr.responseType = 'json';
            // 2.3. Register the listeners
            // 2.3.1. onload: I received something that's not an error
            xhr.onload = function() {
                // Get the loaded data and transform to a literal object
                that.results = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
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
            // Call the generateTableUI function
            //this.generateTableUI();
            // Call the generateCollageUI function
            this.generateCollageUI();
        };

        // Generate the albums as a table with rows
        this.generateTableUI = function() {
            console.log('4. Generate UI with table-element');
            var tempStr = '';
            tempStr += '<div class="mdl-cell mdl-cell--12-col">';
            tempStr += '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">'
            tempStr += '<thead>';
            tempStr += '<tr>';
            tempStr += '<th></th>';
            tempStr += '<th>Title</th>';
            tempStr += '<th>Description</th>';
            tempStr += '<th>Channel</th>';
            tempStr += '<th>Published At</th>';
            tempStr += '</tr>';
            tempStr += '</thead>';
            tempStr += '<tbody>';
            for(var i=0;i<this.results.items.length;i++) {
                var movie = this.results.items[i].snippet;
                tempStr += '<tr>';
                tempStr += '<td class="mdl-data-table__cell--non-numeric"><img src="' + movie.thumbnails.default.url + '" /></td>';
                tempStr += '<td class="mdl-data-table__cell--non-numeric">' + movie.title + '</td>';
                tempStr += '<td class="mdl-data-table__cell--non-numeric">' + movie.description + '</td>';
                tempStr += '<td class="mdl-data-table__cell--non-numeric">' + movie.channelTitle + '</td>';
                tempStr += '<td class="mdl-data-table__cell--non-numeric">' + movie.publishedAt + '</td>';
                tempStr += '</tr>';
            };
            tempStr += '</tbody>';
            tempStr += '</div>';
            document.querySelector('.youtube-results').innerHTML = tempStr;
        };

        this.generateCollageUI = function() {
            var tempStr = '';
            var ch = window.innerHeight - 110;
            tempStr += '<div class="collage" style="height:' + ch + 'px;">';
            
            for(var i=0;i<this.results.items.length;i++) {
                var movie = this.results.items[i].snippet;
                tempStr += '<picture class="collage__picture">';
                tempStr += '<img src="' + movie.thumbnails.high.url + '" />';
                tempStr += '</picture>';
            };

            tempStr += '</div>';

            document.querySelector('.youtube-results').innerHTML = tempStr;

            // Animate Collage Pictures
            this.currentIndexCollagePictureAnimated = 0;
            this.animateCollagePicturesUI();
        }

        this.currentIndexCollagePictureAnimated = 0;
        this.animateCollagePicturesUI = function() {
            var collageElement = document.querySelectorAll('.youtube-results .collage');
            var collagePictureElements = document.querySelectorAll('.youtube-results .collage__picture');

            if(this.currentIndexCollagePictureAnimated < collagePictureElements.length) {
                var collagePicture = collagePictureElements[this.currentIndexCollagePictureAnimated];
                var tx = Math.random()*collageElement[0].offsetWidth;
                var ty = Math.random()*collageElement[0].offsetHeight;
                var deg = Math.random()*360;
                var styleStr = `transform:translateX(${tx}px) translateY(${ty}px) rotate(${deg}deg); transition: all 238ms ease-in-out 0s;`;
                collagePicture.setAttribute('style', styleStr);

                var that = this;
                window.setTimeout( function() { that.animateCollagePicturesUI(); }, 268);

                this.currentIndexCollagePictureAnimated++;
            }
        }

    }; 

    // Make an instance of the YouTubeApp object constructor
    var ytApp = new YouTubeApp();
    // Call the function init from the ytApp object
    ytApp.init();

})();