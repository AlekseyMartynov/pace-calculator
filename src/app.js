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

if(window.cordova)
    document.addEventListener("deviceready", onDeviceReady, false);    

function onDeviceReady() {
    document.addEventListener("backbutton", onBackButton, false);
}

function onBackButton(e) {
    var visibleModals = $(".modal.in:visible");
    if(visibleModals.length) {
        visibleModals.modal("hide");
        e.preventDefault();
    } else {
        navigator.app.exitApp();
    }
}