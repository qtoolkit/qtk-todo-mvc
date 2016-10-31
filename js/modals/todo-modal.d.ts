import { TodoItem, ITodoModal } from "./itodo-modal";
export declare class TodoModal {
    data: Array<TodoItem>;
    save(): ITodoModal;
    load(): ITodoModal;
}
