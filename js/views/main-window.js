"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var todo_list_item_1 = require("./todo-list-item");
var qtk_1 = require("qtk");
var qtk_2 = require("qtk");
var MainWindow = (function (_super) {
    __extends(MainWindow, _super);
    function MainWindow() {
        _super.apply(this, arguments);
    }
    MainWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.title = qtk_2.Label.create({ text: "Todo", styleType: "label.title" });
        this.addChild(this.title, true);
        this.edit = qtk_2.Edit.create({ h: 30,
            inputTips: "What needs to be done?",
            dataBindingRule: {
                value: { path: "$new-content", updateTiming: "changed" },
                confirm: { command: "new" }
            }
        });
        this.addChild(this.edit, true);
        this.listView = qtk_2.ListView.create({ itemH: 50, templateItem: todo_list_item_1.TodoListItem.createTemplateItem() });
        this.addChild(this.listView, true);
        this.bottomGroup = qtk_2.Group.create({ h: 36 });
        this.bottomGroup.childrenLayouter = qtk_1.LinearLayouter.createH();
        this.addChild(this.bottomGroup, true);
        var totalItemsLabel = qtk_2.Label.create({ text: "0 items left",
            dataBindingRule: { value: { path: "$total", converter: "itemLeft" } },
            layoutParam: qtk_1.LinearLayouterParam.create({ w: 100, h: "100%" })
        });
        this.bottomGroup.addChild(totalItemsLabel);
        var allButton = qtk_2.RadioButton.create({ value: true, text: "All", styleType: "filter-button",
            dataBindingRule: { click: { command: "filter", commandArgs: { filter: null } } },
            layoutParam: qtk_1.LinearLayouterParam.create({ spacing: 2, w: 80, h: "100%" })
        });
        this.bottomGroup.addChild(allButton);
        var activeButton = qtk_2.RadioButton.create({ text: "Active", styleType: "filter-button",
            dataBindingRule: { click: { command: "filter", commandArgs: { filter: "active" } } },
            layoutParam: qtk_1.LinearLayouterParam.create({ spacing: 2, w: 100, h: "100%" })
        });
        this.bottomGroup.addChild(activeButton);
        var completedButton = qtk_2.RadioButton.create({ text: "Completed", styleType: "filter-button",
            dataBindingRule: { click: { command: "filter", commandArgs: { filter: "completed" } } },
            layoutParam: qtk_1.LinearLayouterParam.create({ spacing: 2, w: 128, h: "100%" })
        });
        this.bottomGroup.addChild(completedButton);
        var clearCompletedButton = qtk_2.Button.create({ text: "Clear Completed",
            dataBindingRule: { click: { command: "clearCompleted" } },
            layoutParam: qtk_1.LinearLayouterParam.create({ w: 128, h: "100%", position: -1 })
        });
        this.bottomGroup.addChild(clearCompletedButton);
        this.relayoutChildren();
        this.bindData(this.viewModal);
    };
    MainWindow.prototype.relayoutChildren = function () {
        var y = 10;
        var h = 60;
        var w = Math.min(600, this.w);
        var x = (this.w - w) >> 1;
        this.title.moveResizeTo(x, y, w, h);
        y += h + 5;
        h = 30;
        this.edit.moveResizeTo(x, y, w, h);
        y += h + 5;
        h = this.h - 180;
        this.listView.moveResizeTo(x, y, w, h);
        this.listView.relayoutChildren();
        y += h + 2;
        h = 36;
        this.bottomGroup.moveResizeTo(x, y, w, h);
        this.bottomGroup.relayoutChildren();
        return null;
    };
    MainWindow.create = function (options) {
        var win = new MainWindow();
        win.reset("main-window", options);
        win.open();
        return win;
    };
    return MainWindow;
}(qtk_1.WindowNormal));
exports.MainWindow = MainWindow;
;
//# sourceMappingURL=main-window.js.map