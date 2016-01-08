"use strict";

var SEC_PER_HOUR = 3600;

var model = require("./distTimeModel"),
    bisect = require("./bisect");

function bisectModel(time) {
    return bisect(model, time, 0, 300, 0.001);
}

module.exports = {
    
    calcFactor: function(raceKm, raceSeconds) {
        return model(raceKm) / raceSeconds;
    },
    
    calcEfforts: function(workout, factor) {
        var fastTime = SEC_PER_HOUR * workout.minHours,
            slowTime = SEC_PER_HOUR * workout.maxHours;

        return {
            slow: slowTime / bisectModel(slowTime * factor),
            fast: fastTime / bisectModel(fastTime * factor)
        };
    }   
        
};