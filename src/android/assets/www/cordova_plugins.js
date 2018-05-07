cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "phonegap-plugin-push.PushNotification",
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "id": "es6-promise-plugin.Promise",
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-push": "1.8.4",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "5.4.0"
};
// BOTTOM OF METADATA
});