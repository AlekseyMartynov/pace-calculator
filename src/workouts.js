"use strict";

// https://www.mcmillanrunning.com/articlePages/article/3
// https://www.mcmillanrunning.com/articlePages/page/21

function create(name, info, minHours, maxHours, minHr, maxHr, stress) {
    return {
        name: name,
        info: info,
        minHours: minHours,
        maxHours: maxHours,
        minHr: minHr,
        maxHr: maxHr,
        stress: stress
    };
}    

module.exports = [

    // Endurance 

    create(
        "Recovery",
        [ 
            "15-45 minutes",
            "Very slow!", 
            "To recover from hard training or racing"
        ],
        7, 10,
        0.6, 0.7
    ),
    
    create(
        "Long",
        [ 
            "At least 1 hour, up to 4 hours",
            "To improve endurance",
            "Optionally fast-finish the last 10-20 minutes at a medium-hard effort"
        ],
        3.75, 8,
        0.6, 0.85
    ),
    
    create(
        "Easy",
        [
            "15-90 minutes",
            "To develop and maintain basic fitness level", 
            "Bulk of your training!"
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
            "Best workout to raise base fitness"
        ],
        1.25, 2.5,
        0.83, 0.87,
        true
    ),
    
    create(
        "Tempo",
        [
            "15-40 minutes",
            "Running at your lactate threshold pace, to push it faster",
            "Comfortably-hard effort"
        ],
        2 / 3, 1.25,
        0.85, 0.9,
        true
    ),
    
    create(
        "Tempo Intervals",
        [
            "2-15 minute run with quarter-duration jog between",
            "20-60 minutes in total",
            "Faster than your lactate threshold pace",
            "Medium-hard effort"
        ],
        5/12, 1,
        0.87, 0.92,
        true
    ),
    
    // Speed
    
    create(
        "Speed Intervals",            
        [
            "1-6 minute run with half- or equal-duration jog between",
            "10-30 minutes in total", 
            "Running at your VO₂ max pace, to push it faster",
            "Hard effort"
        ],
        1/12, 5/12,
        0.9, 1,
        true
    )

];