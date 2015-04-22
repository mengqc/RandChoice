///<reference path="App.ts"/>
///<reference path="jquery.d.ts"/>
///<reference path="jquerymobile.d.ts"/>
/**
 * Created by mengqingchao on 15/4/19.
 */

var STORAGE_NAME = "nameList";

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
        var storage:any = window.localStorage;
        var itemListStr: string = storage.getItem(STORAGE_NAME);
        var itemList: Array<string> = itemListStr ? JSON.parse(itemListStr) : [];
        var choseIndex : number = ~~(Math.random() * itemList.length);
        if(itemList.length > 0){
            console.log(itemList[choseIndex]);
        }
    }

}


class ItemListPage extends Page{
    constructor(){
        super($("#itemList"));
        console.log("init itemList page");
    }

    onShow(event:any){
        console.log("onShow");
        var storage:any = window.localStorage;
        var itemListStr: string = storage.getItem(STORAGE_NAME);
        var itemList: Array<string> = itemListStr ? JSON.parse(itemListStr) : [];
        console.log(itemList);
        //$("#itemList #lsItem").empty();
        for(var i:number = 0; i < itemList.length; i++){
            var template: string = '<li>'+
            '<a href="#">' +
            '<p>' + itemList[i] + '</p>' +
            '</a>' +
            '<a href="#" data-role="hide-item' + (i + 1) + '" class="ui-btn ui-btn-right ui-icon-delete"></a>' +
            '</li>';
            $("#itemList #lsItem").append(template);
        }
        $("#itemList #lsItem").listview("refresh");
        $(".ui-icon-delete").click(this.onDeleteItem);
    }

    onDeleteItem(event:any){
        console.log(event);
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
            var storage:any = window.localStorage;
            var itemListStr: string = storage.getItem(STORAGE_NAME);
            var itemList: Array<string> = itemListStr ? JSON.parse(itemListStr) : [];
            itemList.push(value);
            storage.setItem(STORAGE_NAME, JSON.stringify(itemList));
        }
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

Main.s().start();