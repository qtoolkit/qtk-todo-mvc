import {TodoListItem} from "./todo-list-item";
import {SimpleLayouter, SimpleLayouterParam} from "qtk"
import {WindowNormal, LinearLayouter, LinearLayouterParam} from "qtk"
import {CollectionViewModel, ListView, Edit, Group, RadioButton, Button, Rect, Label} from "qtk";

export class MainWindow extends WindowNormal {
	protected edit : Edit;
	protected title: Label;
	protected listView : ListView;
	protected bottomGroup : Group;
	protected viewModel : CollectionViewModel;

	protected onInit() {
		super.onInit();

		this.title = Label.create({text:"Todo", styleType:"label.title"});
		this.addChild(this.title, true);

		this.edit = Edit.create({h:30,
			inputTips : "What needs to be done?",
			dataBindingRule : {
				value: {path:"$new-content", updateTiming:"changed"},
				confirm : {command:"new"}
			}
		});

		this.addChild(this.edit, true);
		this.listView = ListView.create({itemH:50, templateItem:TodoListItem.createTemplateItem()});
		this.addChild(this.listView, true);
		
		this.bottomGroup = Group.create({h:36});
		this.bottomGroup.childrenLayouter = LinearLayouter.createH();
		this.addChild(this.bottomGroup, true);
		
		var totalItemsLabel  = Label.create({text:"0 items left",
			dataBindingRule : {value: {path:"$total", converter:"itemLeft"}},
			layoutParam : LinearLayouterParam.create({w:100, h:"100%"})
		});
		this.bottomGroup.addChild(totalItemsLabel);

		var allButton = RadioButton.create({value:true, text:"All", styleType:"filter-button",
			dataBindingRule : {click:{command:"filter", commandArgs:{filter:null}}},
			layoutParam : LinearLayouterParam.create({spacing:2, w:80, h:"100%"})
		});
		this.bottomGroup.addChild(allButton);
		
		var activeButton = RadioButton.create({text:"Active", styleType:"filter-button",
			dataBindingRule : {click:{command:"filter", commandArgs:{filter:"active"}}},
			layoutParam : LinearLayouterParam.create({spacing:2, w:100, h:"100%"})
		});
		this.bottomGroup.addChild(activeButton);
		
		var completedButton = RadioButton.create({text:"Completed", styleType:"filter-button",
			dataBindingRule : {click:{command:"filter", commandArgs:{filter:"completed"}}},
			layoutParam : LinearLayouterParam.create({spacing:2, w:128, h:"100%"})
		});
		this.bottomGroup.addChild(completedButton);
		
		var clearCompletedButton = Button.create({text:"Clear Completed",
			dataBindingRule : {click:{command:"clearCompleted"}},
			layoutParam : LinearLayouterParam.create({w:128, h:"100%", position:-1})
		});
		this.bottomGroup.addChild(clearCompletedButton);
		this.relayoutChildren();

		this.bindData(this.viewModel);
	}

	public relayoutChildren() : Rect {
		var y = 10;
		var h = 60;
		var w = Math.min(600, this.w);
		var x = (this.w - w) >> 1;
		
		this.title.moveResizeTo(x, y, w, h);
		
		y += h+5;
		h = 30;
		this.edit.moveResizeTo(x, y, w, h);
		
		y += h+5;
		h = this.h - 180; 
		this.listView.moveResizeTo(x, y, w, h);
		this.listView.relayoutChildren();

		y += h + 2;
		h = 36;
		this.bottomGroup.moveResizeTo(x, y, w, h);
		this.bottomGroup.relayoutChildren();

		return null;
	}

	public static create(options:any) : MainWindow {
		var win = new MainWindow();
		win.reset("main-window", options);
		win.open();

		return win;
	}
};


