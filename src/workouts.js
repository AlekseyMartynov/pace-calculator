"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

var SEC_PER_HOUR = 3600,
    STAMINA_WARMUP = "Warm-up for 10-20 min.";

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
            info: "At least 1 h. To improve endurance. Optionally fast-finish the last 10 min at a medium-hard effort.",
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
            info: "25-90 min. Lactate clearance pace. " + STAMINA_WARMUP,
            racePace: [ 1.25 * SEC_PER_HOUR, 2.5 * SEC_PER_HOUR ],
            hrPercent: [ 0.83, 0.87 ]
        },
        {
            name: "Tempo",
            info: "10-40 min. Lactate threshold pace. Comfortably-hard effort. " + STAMINA_WARMUP,
            racePace: [ 2 / 3 * SEC_PER_HOUR, 1.25 * SEC_PER_HOUR ],
            hrPercent: [ 0.85, 0.9 ]
        },
        {
            name: "Tempo Intervals",
            info: "2-15 min run with quarter-duration jog between. Above lactate threshold. Medium-hard effort. " + STAMINA_WARMUP,
            racePace: [ 5/12 * SEC_PER_HOUR, 1 * SEC_PER_HOUR ],
            hrPercent: [ 0.87, 0.92 ]
        }
    ]

};