"use strict";

var sign = Math.sign,
    abs = Math.abs;

sign = sign || function(x) {
    if (x === 0 || isNaN(x))
        return x;

    return x > 0 ? 1 : -1;
};

module.exports = function(func, target, left, right, epsilon) {
    var iterationCount = 0,
        x,
        y;

    while(true) {
        x = 0.5 * (left + right);
        y = func(x) - target;

        if(abs(y) < epsilon || iterationCount > 100)
            return x;

        if(sign(y) === sign(func(left) - target))
            left = x;
        else
            right = x;

        iterationCount++;
    }
};