///<reference path="App.ts"/>
///<reference path="jquery.d.ts"/>
///<reference path="jquerymobile.d.ts"/>
/**
 * Created by mengqingchao on 15/4/19.
 */

interface IPage {
    onShow(event:any);
    onHide(event:any);
}

class Page implements IPage {

    constructor(public pageDom: any){
        pageDom.on("pageshow", this.onShow);
        pageDom.on("pagehide", this.onHide);
    }

    onShow(event:any){

    }

    onHide(event:any){

    }
}

class MainPage extends Page{

    constructor() {
        super($("#main"));
        console.log("init main page");
        $("#main #btnStart").click(this.onStartClicked);
    }

    onStartClicked(){
        console.log("Start Clicked");
        var itemList: Array<string> = appStorage.getItems();
        var choseIndex : number = ~~(Math.random() * itemList.length);
        if(itemList.length > 0){
            $("#main #result").html(itemList[choseIndex]);
        }
    }

    onHide(event:any){
        $("#main #result").empty();
    }

}


class ItemListPage extends Page{
    constructor(){
        super($("#itemList"));
        console.log("init itemList page");
        this.pageDom[0].addEventListener("delete", this.onDeleteItem);
        this.pageDom[0].addEventListener("refresh", this.onDeleteItem);
    }

    onShow(event:any){
        console.log("onShow");
        var itemList: Array<string> = appStorage.getItems();
        console.log(itemList);
        $("#itemList #lsItem").empty();
        for(var i:number = 0; i < itemList.length; i++){
            var template: string = '<li>'+
            '<a href="#">' +
            '<p>' + itemList[i] + '</p>' +
            '</a>' +
            '<a href="#" onclick="dispatch(this, \'delete\', \'' + itemList[i] + '\');" class="ui-btn ui-btn-right ui-icon-delete"></a>' +
            '</li>';
            $("#itemList #lsItem").append(template);
        }
        $("#itemList #lsItem").listview("refresh");
    }

    onDeleteItem(event:any){
        console.log(event);
        var delValue: string = event["data"];
        appStorage.removeItem(delValue);

        var itemList: Array<string> = appStorage.getItems();
        console.log(itemList);
        $("#itemList #lsItem").empty();
        for(var i:number = 0; i < itemList.length; i++){
            var template: string = '<li>'+
                '<a href="#">' +
                '<p>' + itemList[i] + '</p>' +
                '</a>' +
                '<a href="#" onclick="dispatch(this, \'delete\', \'' + itemList[i] + '\');" class="ui-btn ui-btn-right ui-icon-delete"></a>' +
                '</li>';
            $("#itemList #lsItem").append(template);
        }
        $("#itemList #lsItem").listview("refresh");
    }

}


class OneItemPage extends Page{
    constructor(){
        super($("#oneItem"));
        console.log("init oneItem page");
        $("#oneItem #btnAdd").click(this.onAdd);
    }

    onAdd(event:any){
        var value: string = $("#tfItemName").val();
        console.log(value);
        if(value) {
            appStorage.addItem(value);
        }
        $("#tfItemName").val("");
        $("#oneItem").dialog("close");
    }
}


class Main extends App {

    static inst: Main;
    pages: Array<any> = [];

    constructor(){
        super();
        console.log("construct Main");
        Main.inst = this;
    }

    static s(){
        if(!Main.inst){
            Main.inst = new Main();
        }
        return Main.inst;
    }

    onDeviceReady(){
        console.log("onDeviceReady");
        Main.s().pages.push(new MainPage());
        Main.s().pages.push(new ItemListPage());
        Main.s().pages.push(new OneItemPage());
    }

    onLoad(){
        console.log("onLoad");
    }

    onOffline(){
        console.log("onOffline");
    }

    onOnLine(){
        console.log("onOnLine");
    }
}

class AppStorage{

    storage: any;
    data: Array<string>;

    constructor(public dataKey: string){
        this.storage = window.localStorage;
        var dataStr: string = this.storage.getItem(this.dataKey);
        this.data = dataStr ? JSON.parse(dataStr) : [];
    }

    save(){
        this.storage.setItem(this.dataKey, JSON.stringify(this.data));
    }

    addItem(item: string) {
        this.data.push(item);
        this.save();
    }

    removeItem(item: string){
        var i: number = this.data.indexOf(item);
        if(i > -1){
            this.data.splice(i, 1);
        }
        this.save();
    }

    getItems(){
        return this.data;
    }

}

function dispatch(obj: any, name: string, data?: any){
    var e : Event = document.createEvent("Event");
    e.initEvent(name, true, true);
    e["data"] = data;
    obj.dispatchEvent(e);
}

var appStorage: AppStorage = new AppStorage("nameList");

Main.s().start();