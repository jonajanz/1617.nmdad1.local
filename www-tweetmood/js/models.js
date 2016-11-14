// Simulation of enumeration in JavaScript
var Moods = {
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
    this.Id;
    this.Content;
    this.Mood = Moods.NEUTRAL;
    this.CreatedAt;
    this.UpdatedAt;
    this.DeletedAt;
};