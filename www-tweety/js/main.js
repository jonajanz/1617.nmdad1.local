function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
      "init": function() {
        console.log("pietenpact");
      }
    };

    App.init();

});