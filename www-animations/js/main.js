function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 9)
    : cb();
};

ready(function(){
    
    // Literal object
    var App = {
        init: function() {
            console.log('Initialize the app.');
            this.registerWaypoints(); // Register the waypoints
        },
        registerWaypoints: function() {
            var personElements = document.querySelectorAll('.person');
            for(var i=0;i<personElements.length;i++) {
                var personElement = personElements[i];
                console.log(i);
                var waypoint = new Waypoint({
                    element: personElement,
                    handler: function(direction) {
                        if(direction == 'down') {
                            this.element.classList.add('person--show');
                        } else {
                            this.element.classList.remove('person--show');
                        }
                    },
                    offset: '50%'
                });
            }
        }
    }

    App.init(); // Initalize the app by calling the init() function
});