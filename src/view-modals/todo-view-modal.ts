import {DelegateValueConverter, DelegateFilter, DelegateComparator, ValidationResult} from "qtk";
import {KeyEvent, Events, CollectionViewModal, DelegateCommand} from "qtk";
import {TodoItem} from "../modals/itodo-modal";

export class TodoViewModal extends CollectionViewModal {
	protected _newContent : string;

	constructor(data:Array<any>) {
		super(data);
		this.initFilters();
		this.initCommands();
		this.initConverters();
	}

	public getProp(path:string, converterName?:string) : any {
		if(path.indexOf("$total") >= 0) {
			return this.convert(converterName, this.total);
		}
		if(path.indexOf("$new-content") >= 0) {
			return this._newContent;	
		}
		return super.getProp(path, converterName);
	}
	
	public setProp(path:string, value:any, converterName?:string, validationRule?:string) : ValidationResult {
		if(path.indexOf("$new-content") >= 0) {
			this._newContent = value;	
			return ValidationResult.validResult;
		}
		return super.setProp(path, value, converterName, validationRule);
	}

	protected initFilters() {
		this.registerFilter("active", DelegateFilter.create(item => !item.completed));
		this.registerFilter("completed", DelegateFilter.create(item =>item.completed));
	}

	protected clearCompleted() {
		this.removeItems(item =>item.completed);
	}
	
	protected canClearCompleted() {
		return this.collection.some((item:TodoItem) => item.completed);
	}

	protected createNew() {
		var content = this._newContent;
		var hasItems = this.hasItems(item => item.content === content);
		if(content && !hasItems) {
			this.addItem(TodoItem.create(content, false));
		}
	}

	protected initCommands() {
		this.registerCommand("filter", DelegateCommand.create((args) => this.filter = args.filter, null));
		this.registerCommand("clearCompleted", 
			DelegateCommand.create((args) => this.clearCompleted(), () => this.canClearCompleted()));
		this.registerCommand("new", 
			DelegateCommand.create((args) => this.createNew(), () => !!this._newContent));
	}

	protected initConverters() {
		this.registerValueConverter("itemLeft", 
			DelegateValueConverter.create(value => value + " items left", null));
	}

	public static create(data:Array<any>) : TodoViewModal {
		return new TodoViewModal(data);
	}
}
