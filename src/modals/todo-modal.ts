import {TodoItem, ITodoModal} from "./itodo-modal";

export class TodoModal {
	public data : Array<TodoItem>;

	public save() : ITodoModal {
		var str = JSON.stringify(this.data);
		localStorage.setItem("qtk-todos", str);

		return this;
	}

	public load() : ITodoModal {
		var str = localStorage.getItem("qtk-todos");
		if(str) {
			var items = JSON.parse(str);
			this.data = items.map((item:any) => {
				return TodoItem.create(item.content, item.completed);
			});
		}else{
			this.data = [];
		}

		return this;
	}
};
