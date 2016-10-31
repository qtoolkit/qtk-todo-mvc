export declare class TodoItem {
    content: string;
    completed: boolean;
    constructor(content: string, completed: boolean);
    static create(content: string, completed: boolean): TodoItem;
}
export interface ITodoModal {
    data: Array<TodoItem>;
    save(): ITodoModal;
    load(): ITodoModal;
}
