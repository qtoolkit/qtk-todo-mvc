export declare class TodoItem {
    content: string;
    completed: boolean;
    constructor(content: string, completed: boolean);
    static create(content: string, completed: boolean): TodoItem;
}
export interface ITodoStorage {
    data: Array<TodoItem>;
    save(): ITodoStorage;
    load(): ITodoStorage;
}
