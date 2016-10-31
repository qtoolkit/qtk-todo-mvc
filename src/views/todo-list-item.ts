import {Events} from "qtk";
import {ListItem, Rect, Button, Widget, Label, CheckButton, WidgetFactory, WidgetRecyclableCreator} from "qtk";

export class TodoListItem extends ListItem {
	constructor() {
		super(TodoListItem.TYPE);
	}
	public relayoutChildren() : Rect {
		var r = this.getLayoutRect();
		if(this.w && this.h) {
			var x = r.x;
			var h = r.h;
			var w = r.h;
			var y = r.y;
			var completeButton = this.findChildByName("completed");
			var contentLabel = this.findChildByName("content");
			var removeButton = this.findChildByName("remove");

			if(completeButton) {
				completeButton.moveResizeTo(x, y, w, h);
			}
			if(removeButton) {
				removeButton.moveResizeTo(this.w - r.x - r.h, y, w, h);
			}
			if(contentLabel) {
				contentLabel.moveResizeTo(r.x + r.h, y, r.w - 2 * r.h, h);
			}
		}

		return r;
	}

	public onInit() {
		super.onInit();
		var removeButton = this.findChildByName("remove");
		this.on(Events.POINTER_ENTER, evt => removeButton.visible = true);
		this.on(Events.POINTER_LEAVE, evt => removeButton.visible = false);
	}

	public static TYPE = "list-item";
	private static rBin = WidgetRecyclableCreator.create(TodoListItem);
	
	public static createTemplateItem(options?:any) : TodoListItem {
		var item = TodoListItem.create(options);

		item.addChild(CheckButton.create({styleType:"completed",name:"completed", dataBindingRule:"completed"}));
		item.addChild(Label.create({name:"content", dataBindingRule:"content"}));
		item.addChild(Button.create({styleType:"button.remove", name:"remove", visible:false, 
									dataBindingRule: {click: {command:"remove"}}}));

		return item;
	}

	public static create(options?:any) : TodoListItem {
		return <TodoListItem>TodoListItem.rBin.create(options);
	}
};

WidgetFactory.register(TodoListItem.TYPE, TodoListItem.create);

