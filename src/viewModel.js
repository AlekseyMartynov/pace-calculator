/* global ko, $ */

"use strict";

var KM_PER_MILE = 1.609344,
    INPUT_STORAGE_KEY = "input-v1";

var 
    workouts = require("./workouts"),
    calculator = require("./calculator"),
    formatterFactory = require("./formatter");

var input = {
    raceDist: ko.observable(),
    raceDistUnits: ko.observable(),
    raceHours: ko.observable(),
    raceMinutes: ko.observable(),
    raceSeconds: ko.observable(),
    hrMax: ko.observable(),
    age: ko.observable(),
    outputFormat: ko.observable(),
    outputUnits: ko.observable()
};

var result = ko.observable(),
    effortCaption = ko.observable(),
    activeResultItem = ko.observable();

function toNumber(value) {
    if(typeof value === "string")
        value = value.replace(",", ".");
    return Number(value);
}

function raceKilometers() {
    var value = toNumber(input.raceDist());

    switch(input.raceDistUnits()) {
        case "m":
            return value / 1000;

        case "mi":
            return value * KM_PER_MILE;

        case "km":
            return value;
    }

    throw "Unexpected";
}

function raceTotalSeconds() {
    var h = toNumber(input.raceHours() || 0),
        m = toNumber(input.raceMinutes() || 0),
        s = toNumber(input.raceSeconds() || 0);

    return 60 * (60 * h + m) + s;
}

function resolveHrMax() {
    var hrMaxValue = toNumber(input.hrMax()),
        ageValue = toNumber(input.age());

    if(hrMaxValue > 150 && hrMaxValue < 250)
        return hrMaxValue;

    if(ageValue > 10 && ageValue < 100)
        return 220 - ageValue;

    return null;
}

function calculate() {
    var formatter = formatterFactory(input.outputFormat() === "speed", input.outputUnits() === "km"),
        pendingResult = null,
        factor = calculator.calcFactor(raceKilometers(), raceTotalSeconds()),
        hrMax = resolveHrMax(),
        i, workout;
        
    if(factor && isFinite(factor)) {       
        effortCaption(formatter.effortUnit);
        pendingResult = [ ];
        
        for(i = 0; i < workouts.length; i++) {
            workout = workouts[i];
            pendingResult.push({
                workout: workout,
                effort: formatter.formatEfforts(calculator.calcEfforts(workout, factor)),
                hr: [ formatHr(workout.minHr), formatHr(workout.maxHr) ].join(" - "),
                displayDetails: displayDetails  
            });
        }
    }
    
    function formatHr(percentage) {
        return formatter.formatHeartRate(percentage, hrMax);
    }
        
    result(pendingResult);
    persistInput();
}

function displayDetails(resultItem) {
    activeResultItem(resultItem);
    $("#workout-modal").modal();
}

function persistInput() {
    localStorage.setItem(INPUT_STORAGE_KEY, ko.toJSON(input));
}

function restoreInput() {
    var data = ko.utils.parseJson(localStorage.getItem(INPUT_STORAGE_KEY)),
        key;

    if(!data)
        return;

    for(key in data) {
        if(data.hasOwnProperty(key) && key in input)
            input[key](data[key]);
    }

    calculate();
}

function ensureRange(obs, min, max) {
    obs.subscribe(function(v) {
        if(v !== "") {
            v = toNumber(v);
            if(min !== undefined && v < min) obs(min);
            if(max !== undefined && v > max) obs(max);
        }
    });
}

function rejectNegative(obj) {
    obj.subscribe(function(v) {
        if(toNumber(v) < 0)
            obj("");
    });
}

rejectNegative(input.raceDist);
rejectNegative(input.raceHours, 0);
ensureRange(input.raceMinutes, 0, 59);
ensureRange(input.raceSeconds, 0, 59);

restoreInput();

module.exports = {
    input: input,
    calculate: calculate,
    result: result,
    effortCaption: effortCaption,
    activeResultItem: activeResultItem
};