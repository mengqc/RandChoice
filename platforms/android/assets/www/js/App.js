/**
 * Created by mengqingchao on 15/4/19.
 */
var App = (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.bindEvents();
    };
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    App.prototype.bindEvents = function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onLoad, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnLine, false);
    };
    App.prototype.onDeviceReady = function () {
    };
    App.prototype.onLoad = function () {
    };
    App.prototype.onOffline = function () {
    };
    App.prototype.onOnLine = function () {
    };
    return App;
})();
//# sourceMappingURL=App.js.map