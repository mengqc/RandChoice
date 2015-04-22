///<reference path="App.ts"/>
/**
 * Created by mengqingchao on 15/4/19.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.onDeviceReady = function () {
        console.log("onDeviceReady");
        var id = 'deviceready';
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };
    Main.prototype.onLoad = function () {
        console.log("onLoad");
        alert("onLoad");
    };
    Main.prototype.onOffline = function () {
        console.log("onOffline");
        alert("onOffline");
    };
    Main.prototype.onOnLine = function () {
        console.log("onOnLine");
        alert("onOnLine");
    };
    return Main;
})(App);
var app = new Main();
app.start();
//# sourceMappingURL=Main.js.map