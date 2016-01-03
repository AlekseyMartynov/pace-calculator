/* global ko, $ */

"use strict";

$(function() {
    ko.applyBindings(require("./viewModel"));
    
    $("body").tooltip({ 
        selector: "[data-toggle=tooltip]",
        container: "body",
        placement: "auto"
    });    
});