
export class TodoItem {
	public content:string;
	public completed:boolean;

	constructor(content:string, completed:boolean) {
		this.content = content;
		this.completed = completed;
	}

	public static create(content:string, completed:boolean) {
		return new TodoItem(content, completed);
	}
};

export interface ITodoModel {
	data : Array<TodoItem>;
	save() : ITodoModel;
	load() : ITodoModel;
};

