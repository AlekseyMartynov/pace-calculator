"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

// TODO add short comments for each workout to display in tooltip

var SEC_PER_HOUR = 3600;

module.exports = {

    endurance: [
        {
            name: "Recovery",
            racePace: [ 7 * SEC_PER_HOUR, 10 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.7 ]
        },
        {
            name: "Long",
            racePace: [ 3.75 * SEC_PER_HOUR, 8 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.85 ]
        },
        {
            name: "Easy",
            racePace: [ 3.5 * SEC_PER_HOUR, 6.75 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.85 ]
        }
    ],

    stamina: [
        {
            name: "Steady-State",
            racePace: [ 1.25 * SEC_PER_HOUR, 2.5 * SEC_PER_HOUR ],
            hrPercent: [ 0.83, 0.87 ]
        },
        {
            name: "Tempo",
            racePace: [ 2 / 3 * SEC_PER_HOUR, 1.25 * SEC_PER_HOUR ],
            hrPercent: [ 0.85, 0.9 ]
        },
        {
            name: "Tempo Intervals",
            racePace: [ 0.5 * SEC_PER_HOUR, 1 * SEC_PER_HOUR ],
            hrPercent: [ 0.87, 0.92 ]
        }
    ]

};