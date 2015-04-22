///<reference path="App.ts"/>
///<reference path="jquery.d.ts"/>
///<reference path="jquerymobile.d.ts"/>
/**
 * Created by mengqingchao on 15/4/19.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var STORAGE_NAME = "nameList";
var Page = (function () {
    function Page(pageDom) {
        this.pageDom = pageDom;
        pageDom.on("pageshow", this.onShow);
        pageDom.on("pagehide", this.onHide);
    }
    Page.prototype.onShow = function (event) {
    };
    Page.prototype.onHide = function (event) {
    };
    return Page;
})();
var MainPage = (function (_super) {
    __extends(MainPage, _super);
    function MainPage() {
        _super.call(this, $("#main"));
        console.log("init main page");
        $("#main #btnStart").click(this.onStartClicked);
    }
    MainPage.prototype.onStartClicked = function () {
        console.log("Start Clicked");
        var storage = window.localStorage;
        var itemListStr = storage.getItem(STORAGE_NAME);
        var itemList = itemListStr ? JSON.parse(itemListStr) : [];
        var choseIndex = ~~(Math.random() * itemList.length);
        if (itemList.length > 0) {
            console.log(itemList[choseIndex]);
        }
    };
    return MainPage;
})(Page);
var ItemListPage = (function (_super) {
    __extends(ItemListPage, _super);
    function ItemListPage() {
        _super.call(this, $("#itemList"));
        console.log("init itemList page");
    }
    ItemListPage.prototype.onShow = function (event) {
        console.log("onShow");
        var storage = window.localStorage;
        var itemListStr = storage.getItem(STORAGE_NAME);
        var itemList = itemListStr ? JSON.parse(itemListStr) : [];
        console.log(itemList);
        for (var i = 0; i < itemList.length; i++) {
            var template = '<li>' + '<a href="#">' + '<p>' + itemList[i] + '</p>' + '</a>' + '<a href="#" data-role="hide-item' + (i + 1) + '" class="ui-btn ui-btn-right ui-icon-delete"></a>' + '</li>';
            $("#itemList #lsItem").append(template);
        }
        $("#itemList #lsItem").listview("refresh");
        $(".ui-icon-delete").click(this.onDeleteItem);
    };
    ItemListPage.prototype.onDeleteItem = function (event) {
        console.log(event);
    };
    return ItemListPage;
})(Page);
var OneItemPage = (function (_super) {
    __extends(OneItemPage, _super);
    function OneItemPage() {
        _super.call(this, $("#oneItem"));
        console.log("init oneItem page");
        $("#oneItem #btnAdd").click(this.onAdd);
    }
    OneItemPage.prototype.onAdd = function (event) {
        var value = $("#tfItemName").val();
        console.log(value);
        if (value) {
            var storage = window.localStorage;
            var itemListStr = storage.getItem(STORAGE_NAME);
            var itemList = itemListStr ? JSON.parse(itemListStr) : [];
            itemList.push(value);
            storage.setItem(STORAGE_NAME, JSON.stringify(itemList));
        }
        $("#oneItem").dialog("close");
    };
    return OneItemPage;
})(Page);
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.pages = [];
        console.log("construct Main");
        Main.inst = this;
    }
    Main.s = function () {
        if (!Main.inst) {
            Main.inst = new Main();
        }
        return Main.inst;
    };
    Main.prototype.onDeviceReady = function () {
        console.log("onDeviceReady");
        Main.s().pages.push(new MainPage());
        Main.s().pages.push(new ItemListPage());
        Main.s().pages.push(new OneItemPage());
    };
    Main.prototype.onLoad = function () {
        console.log("onLoad");
    };
    Main.prototype.onOffline = function () {
        console.log("onOffline");
    };
    Main.prototype.onOnLine = function () {
        console.log("onOnLine");
    };
    return Main;
})(App);
Main.s().start();
//# sourceMappingURL=Main.js.map