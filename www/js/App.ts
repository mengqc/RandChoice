/**
 * Created by mengqingchao on 15/4/19.
 */

class App {

    constructor(){

    }

    start() {
        this.bindEvents();
    }

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onLoad, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnLine, false);
    }

    onDeviceReady(){

    }

    onLoad(){

    }

    onOffline(){

    }

    onOnLine(){

    }

}
