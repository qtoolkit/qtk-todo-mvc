import { Application } from "qtk";
import { TodoViewModal } from "./view-modals/todo-view-modal";
export declare class TodoApp extends Application {
    protected createViewModal(): TodoViewModal;
    onReady(): void;
    static run(): TodoApp;
}
