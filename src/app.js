/* global ko, $ */

"use strict";

$(function() {
    applyBrowserHacks();
    
    ko.applyBindings(require("./viewModel"));
    
    $("body").tooltip({ 
        selector: "[data-toggle=tooltip]",
        container: "body",
        placement: "auto"
    });    
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

function applyBrowserHacks() {
    var ua = navigator.userAgent,
        winPhone = /windows phone|iemobile/i.test(ua),
        android = !winPhone && /android/i.test(ua);
        
    if(winPhone)
        $("head").append("<style> @-ms-viewport { width: 340px; } </style>");
        
    // http://getbootstrap.com/getting-started/#support-android-stock-browser
    // https://github.com/twbs/bootstrap/issues/11055#issuecomment-34422391
    if(android && "WebkitAppearance" in document.documentElement.style && ua.indexOf("Chrome") < 0)
        $("html").addClass("android-stock");
}