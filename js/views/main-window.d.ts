import { WindowNormal } from "qtk";
import { CollectionViewModel, ListView, Edit, Group, Rect, Label } from "qtk";
export declare class MainWindow extends WindowNormal {
    protected edit: Edit;
    protected title: Label;
    protected listView: ListView;
    protected bottomGroup: Group;
    protected viewModel: CollectionViewModel;
    protected onInit(): void;
    relayoutChildren(): Rect;
    static create(options: any): MainWindow;
}
