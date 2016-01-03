"use strict";

var model = require("./distTimeModel"),
    bisect = require("./bisect"),
    workouts = require("./workouts");

function bisectModel(time) {
    return bisect(model, time, 0, 300, 0.001);
}

function round5(value) {
    return 5 * Math.round(value / 5);
}

module.exports = function(raceKm, raceSeconds, hrMax, rangeFormatter) {
    var speedFactor = model(raceKm) / raceSeconds,
        result = [ ];

    if(!speedFactor || !isFinite(speedFactor))
        return null;

    processWorkouts(workouts.endurance);
    processWorkouts(workouts.stamina);

    return result;

    function processWorkouts(list) {
        for(var i = 0; i < list.length; i++)
            processOneWorkout(list[i]);
    }

    function processOneWorkout(w) {
        var fastTime = w.racePace[0],
            slowTime = w.racePace[1];

        result.push({
            name: w.name,
            effort: rangeFormatter(
                round5(slowTime / bisectModel(slowTime * speedFactor)),
                round5(fastTime / bisectModel(fastTime * speedFactor))
            ),
            hr: formatHeartRate(w.hrPercent[0]) + " - " + formatHeartRate(w.hrPercent[1])
        });

        function formatHeartRate(factor) {
            if(!hrMax)
                return (100 * factor) + "%";
            return (hrMax * factor).toFixed(0);
        }
    }

};