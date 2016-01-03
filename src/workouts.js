"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

// TODO add short comments for each workout to display in tooltip

var SEC_PER_HOUR = 3600;

module.exports = {

    endurance: [
        {
            name: "Recovery",
            info: "15-60 min. Very slow, to recover from a previous workout or race.",
            racePace: [ 7 * SEC_PER_HOUR, 10 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.7 ]
        },
        {
            name: "Long",
            info: "At least 1 h. To improve endurance. Optionally finish the last 10 min at a medium-hard effort.",
            racePace: [ 3.75 * SEC_PER_HOUR, 8 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.85 ]
        },
        {
            name: "Easy",
            info: "15-90 min. To develop and maintain aerobic capacity. The key workout.",
            racePace: [ 3.5 * SEC_PER_HOUR, 6.75 * SEC_PER_HOUR ],
            hrPercent: [ 0.6, 0.85 ]
        }
    ],

    stamina: [
        {
            name: "Steady-State",
            info: "25-90 min. Lactate-clearance pace. Warm-up for 10-20 min.",
            racePace: [ 1.25 * SEC_PER_HOUR, 2.5 * SEC_PER_HOUR ],
            hrPercent: [ 0.83, 0.87 ]
        },
        {
            name: "Tempo",
            info: "10-40 min. Lactate-threshold pace. Comfortably-hard effort. Warm-up for 10-20 min.",
            racePace: [ 2 / 3 * SEC_PER_HOUR, 1.25 * SEC_PER_HOUR ],
            hrPercent: [ 0.85, 0.9 ]
        },
        {
            name: "Tempo Intervals",
            info: "8-15 min with 2-5 min recovery. Your current 5-10K pace. Medium-hard effort. Warm-up for 10-20 min.",
            racePace: [ 0.5 * SEC_PER_HOUR, 1 * SEC_PER_HOUR ],
            hrPercent: [ 0.87, 0.92 ]
        }
    ]

};