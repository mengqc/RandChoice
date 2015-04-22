///<reference path="App.ts"/>
/**
 * Created by mengqingchao on 15/4/19.
 */

class Main extends App {

    onDeviceReady(){
        console.log("onDeviceReady");
        var id : string = 'deviceready';
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }

    onLoad(){
        console.log("onLoad");
        alert("onLoad");
    }

    onOffline(){
        console.log("onOffline");
        alert("onOffline");
    }

    onOnLine(){
        console.log("onOnLine");
        alert("onOnLine");
    }
}

var app = new Main();
app.start();