import { TodoItem, ITodoStorage } from "./itodo-storage";
export declare class TodoStorage {
    private _data;
    data: Array<TodoItem>;
    save(): ITodoStorage;
    load(): ITodoStorage;
}
