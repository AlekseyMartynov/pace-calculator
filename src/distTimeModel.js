"use strict";

// regression model of https://mcmillanrunning.com/ calculator
// x - distance in km

module.exports = function(x) {
    if(x < 3)
        return 131.94 * Math.pow(x, 1.1116);

    if(x < 30)
        return 137.8 * Math.pow(x, 1.0721);

    if(x < 42.195)
        return 141.63 * Math.pow(x, 1.064);

    if(x < 50)
        return 101.95 * Math.pow(x, 1.1519);

    if(x < 100)
        return 64.585 * Math.pow(x, 1.2685);

    return 30.611 * Math.pow(x, 1.4307);
};