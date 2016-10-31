
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

export interface ITodoModal {
	data : Array<TodoItem>;
	save() : ITodoModal;
	load() : ITodoModal;
};

