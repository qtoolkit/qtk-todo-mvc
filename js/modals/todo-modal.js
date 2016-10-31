"use strict";
var itodo_modal_1 = require("./itodo-modal");
var TodoModal = (function () {
    function TodoModal() {
    }
    TodoModal.prototype.save = function () {
        var str = JSON.stringify(this.data);
        localStorage.setItem("qtk-todos", str);
        return this;
    };
    TodoModal.prototype.load = function () {
        var str = localStorage.getItem("qtk-todos");
        if (str) {
            var items = JSON.parse(str);
            this.data = items.map(function (item) {
                return itodo_modal_1.TodoItem.create(item.content, item.completed);
            });
        }
        else {
            this.data = [];
        }
        return this;
    };
    return TodoModal;
}());
exports.TodoModal = TodoModal;
;
//# sourceMappingURL=todo-modal.js.map