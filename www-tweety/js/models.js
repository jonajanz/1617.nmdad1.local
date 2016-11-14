// Simulation of enumeration in JavaScript
var Mood = {
    NEUTRAL: 0,
    HAPPY: 1,
    SAD: 2,
    properties: {
        0: {id:0, name:'Neutral'},
        1: {id:1, name:'Happy'},
        2: {id:2, name:'Sad'}
    }
};

// Tweet class
function Tweet() {
    this.content = null;
    this.mood = Mood.NEUTRAL;
    this.createdAt = null;
};