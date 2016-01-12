"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

var WARMUP = "Include a warm-up and cool-down, at your Easy pace for 10-20 minutes!";
    
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
        [ 
            "15-60 minutes",
            "Very slow!", 
            "To recover from previous training or racing"
        ],
        7, 10,
        0.6, 0.7
    ),
    
    create(
        "Long",
        [ 
            "At least 1 hour",
            "To build endurance",
            "To increase your ability to burn fat",
            "Optionally fast-finish the last 10 minutes at a medium-hard effort"
        ],
        3.75, 8,
        0.6, 0.85
    ),
    
    create(
        "Easy",
        [
            "15-90 minutes",
            "To develop and maintain your aerobic capacity", 
            "Most runs in a runner's program are easy runs!"
        ],
        3.5, 6.75,
        0.6, 0.85
    ),
    
    // Stamina

    create(
        "Steady-State",
        [
            "25-90 minutes",
            "Slower than your lactate threshold pace", 
            "To improve your body's efficiency in removing lactic acid",
            "To learn how to best distribute the effort",
            WARMUP
        ],
        1.25, 2.5,
        0.83, 0.87
    ),
    
    create(
        "Tempo",
        [
            "10-40 minutes",
            "Running at (or very near) your lactate threshold",
            "To push your threshold pace faster", 
            "Comfortably-hard effort", 
            WARMUP
        ],
        2 / 3, 1.25,
        0.85, 0.9
    ),
    
    create(
        "Tempo Intervals",
        [
            "2-15 minutes run with quarter-duration jog between",
            "Faster than your lactate threshold pace",
            "Alternative to regular Tempo runs", 
            "Medium-hard effort", 
            WARMUP
        ],
        5/12, 1,
        0.87, 0.92
    ),
    
    // Speed
    
    create(
        "Speed Intervals",            
        [
            "1-6 minutes run with half- or same-duration jog between", 
            "VO₂ max pace",
            "To increase your body's ability to process oxygen", 
            "Hard effort", 
            WARMUP
        ],
        1/12, 5/12,
        0.9, 1
    )

];