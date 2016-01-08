"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

var WARMUP = "Warm-up for 10-20 min.";
    
function create(name, info, minHours, maxHours, minHr, maxHr) {
    return {
        name: name,
        info: info,
        minHours: minHours,
        maxHours: maxHours,
        minHr: minHr,
        maxHr: maxHr
    };
}    

module.exports = [

    // Endurance 

    create(
        "Recovery",
        "15-60 min. Very slow, to recover from a previous workout or race.",
        7, 10,
        0.6, 0.7
    ),
    
    create(
        "Long",
        "At least 1 h. To improve endurance. Optionally fast-finish the last 10 min at a medium-hard effort.",
        3.75, 8,
        0.6, 0.85
    ),
    
    create(
        "Easy",
        "15-90 min. To develop and maintain aerobic capacity. The key workout.",
        3.5, 6.75,
        0.6, 0.85
    ),
    
    // Stamina

    create(
        "Steady-State",
        "25-90 min. Lactate clearance pace. " + WARMUP,
        1.25, 2.5,
        0.83, 0.87
    ),
    
    create(
        "Tempo",
        "10-40 min. Lactate threshold pace. Comfortably-hard effort. " + WARMUP,
        2 / 3, 1.25,
        0.85, 0.9
    ),
    
    create(
        "Tempo Intervals",
        "2-15 min run with quarter-duration jog between. Above lactate threshold. Medium-hard effort. " + WARMUP,
        5/12, 1,
        0.87, 0.92
    ),
    
    // Speed
    
    create(
        "Speed Intervals",            
        "1-6 min run with half- or same-duration jog between. VO₂ max pace. Hard effort. " + WARMUP,
        1/12, 5/12,
        0.9, 1
    )

];