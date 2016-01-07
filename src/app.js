/* global ko, $ */

"use strict";

$(function() {
    ko.applyBindings(require("./viewModel"));
    
    $("body").tooltip({ 
        selector: "[data-toggle=tooltip]",
        container: "body",
        placement: "auto"
    });    

    if(/windows phone|iemobile/i.test(navigator.userAgent))
        $("head").append("<style> @-ms-viewport { width: 340px; } </style>");
});