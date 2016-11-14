function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

// Helper function
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

ready(function(){

    // Register backgrounds
    $$(".parallax").forEach(function(el,index,array) {
        var backgroundURL = el.dataset.background;
        el.style.backgroundImage = "url('" + backgroundURL + "')";
    });
    
    // Listen to scroll events on window object
    // Do something when scrolling
    window.addEventListener("scroll", function() {
        var scrolledHeight = window.pageYOffset;
        $$(".parallax").forEach(function(el,index,array) {
            var limit = el.offsetTop + el.offsetHeight;

            if(scrolledHeight > el.offsetTop && scrolledHeight <= limit) {
                el.style.backgroundPositionY = (scrolledHeight - el.offsetTop) / 1.28 + "px";
            } 
            else {
                el.style.backgroundPositionY= "0";
            }
        });
    });

});

/*
ScrollMagic : http://scrollmagic.io/, https://github.com/janpaepke/ScrollMagic
CreateJS    : http://www.createjs.com/
*/