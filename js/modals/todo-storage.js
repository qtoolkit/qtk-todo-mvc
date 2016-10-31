"use strict";
var itodo_storage_1 = require("./itodo-storage");
var TodoStorage = (function () {
    function TodoStorage() {
    }
    Object.defineProperty(TodoStorage.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    TodoStorage.prototype.save = function () {
        var str = JSON.stringify(this._data);
        localStorage.setItem("qtk-todos", str);
        return this;
    };
    TodoStorage.prototype.load = function () {
        var str = localStorage.getItem("qtk-todos");
        if (str) {
            var items = JSON.parse(str);
            this._data = items.map(function (item) {
                return itodo_storage_1.TodoItem.create(item.content, item.completed);
            });
        }
        else {
            this._data = [];
        }
        return this;
    };
    return TodoStorage;
}());
exports.TodoStorage = TodoStorage;
;
//# sourceMappingURL=todo-storage.js.map