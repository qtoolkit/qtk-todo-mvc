"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var main_window_1 = require("./views/main-window");
var todo_modal_1 = require("./modals/todo-modal");
var todo_view_modal_1 = require("./view-modals/todo-view-modal");
var appThemeDataURL = "https://qtoolkit.github.io/qtk-todo-mvc/assets/theme/default/theme.json";
var themeDataURL = "https://qtoolkit.github.io/demos/assets/theme/default/theme.json";
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        _super.apply(this, arguments);
    }
    TodoApp.prototype.createViewModal = function () {
        var modal = new todo_modal_1.TodoModal();
        window.onunload = function () {
            modal.save();
        };
        return todo_view_modal_1.TodoViewModal.create(modal.load().data);
    };
    TodoApp.prototype.onReady = function () {
        var viewModal = this.createViewModal();
        var mainWindow = main_window_1.MainWindow.create({ app: this, viewModal: viewModal }).maximize();
    };
    TodoApp.run = function () {
        var app = new TodoApp("todomvc");
        app.init({ sysThemeDataURL: themeDataURL, appThemeDataURL: appThemeDataURL });
        app.run();
        return app;
    };
    return TodoApp;
}(qtk_1.Application));
exports.TodoApp = TodoApp;
;
//# sourceMappingURL=todo-app.js.map