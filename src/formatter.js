"use strict";

var KM_PER_MILE = 1.609344;

function formatSpeed(secondsPerUnit) {
    return (3600 / secondsPerUnit).toFixed(1);
}

function formatPace(secondsPerUnit) {
    var min = Math.floor(secondsPerUnit / 60),
        sec = Math.floor(secondsPerUnit - 60 * min);

    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

module.exports = function(isSpeed, isMetric) {

    function resolveUnit() {
        if(isSpeed) {
            if(isMetric)
                return "km/h";
            return "MPH";
        }
        if(isMetric)
            return "min/km";
        return "min/mi";
    }

    function formatRange(slow, fast) {
        return formatRangeCore(slow, fast).join(" - ");
    }

    function formatRangeCore(slow, fast) {
        if(!isMetric) {
            slow = slow * KM_PER_MILE;
            fast = fast * KM_PER_MILE;
        }

        if(isSpeed)
            return [ formatSpeed(slow), formatSpeed(fast) ];

        return [ formatPace(fast), formatPace(slow) ];
    }

    return {
        unit: resolveUnit(),
        formatRange: formatRange
    };

};