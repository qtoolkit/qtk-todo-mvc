import {TodoItem, ITodoModel} from "./itodo-model";

export class TodoModel {
	public data : Array<TodoItem>;

	public save() : ITodoModel {
		var str = JSON.stringify(this.data);
		localStorage.setItem("qtk-todos", str);

		return this;
	}

	public load() : ITodoModel {
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
