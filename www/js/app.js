/*
    Date: 2016-01-01
*/
var app = {
    // Some scoped variables

    onDeviceReady : function () {
        //alert("device ready.");
        console.log("device ready.");
        if (device.platform === "iOS") {
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
        } else if (device.platform == 'browser') {
            console.log("You are using a brower.");
        }

        app.setupPush();

    },

    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after push init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            /*var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            */
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }





};

// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

// This JS object is create to support `app.onDeviceReady()`, and the timeout below.
// When `deviceready` fires, this variable is overwritten.
// The hope is that "Cordova/Phonegap" have completed before the timeout.
var device = {platform:'browser'};

// This timeout check to see if `cordova.js` has loaded the `device` plugin.
setTimeout(function() {
        console.log("timeout fired.");
        if (! ('cordova' in device) ) {
            app.onDeviceReady();
        }
    },
    2000);

$(document).ready(function(){
  $('iframe').on("load",function(){


    $('#loading').hide();
  });
});