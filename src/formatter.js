"use strict";

var KM_PER_MILE = 1.609344;

function round5(value) {
    return 5 * Math.round(value / 5);
}

function formatSpeed(secondsPerUnit) {
    return (3600 / secondsPerUnit).toFixed(1);
}

function formatPace(secondsPerUnit) {
    var min = Math.floor(secondsPerUnit / 60),
        sec = Math.floor(secondsPerUnit - 60 * min);

    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

function formatHeartRate(percentage, max) {
    if(!max)
        return (100 * percentage) + "%";
    return (max * percentage).toFixed(0);
}

module.exports = function(isSpeed, isMetric) {

    function resolveEffortUnit() {
        if(isSpeed) {
            if(isMetric)
                return "km/h";
            return "MPH";
        }
        if(isMetric)
            return "min/km";
        return "min/mi";
    }

    function formatEfforts(efforts) {
        return formatEffortsCore(efforts.slow, efforts.fast).join(" - ");
    }

    function formatEffortsCore(slow, fast) {
        if(!isMetric) {
            slow = slow * KM_PER_MILE;
            fast = fast * KM_PER_MILE;
        }
        
        slow = round5(slow);
        fast = round5(fast);

        if(isSpeed)
            return [ formatSpeed(slow), formatSpeed(fast) ];

        return [ formatPace(fast), formatPace(slow) ];
    }

    return {
        effortUnit: resolveEffortUnit(),
        formatEfforts: formatEfforts,
        formatHeartRate: formatHeartRate
    };

};