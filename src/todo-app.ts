import {Application} from "qtk";
import {MainWindow} from "./views/main-window"
import {TodoModal} from "./modals/todo-modal";
import {TodoViewModal}  from "./view-modals/todo-view-modal";

var appThemeDataURL = "https://qtoolkit.github.io/qtk-todo-mvc/assets/theme/default/theme.json";
var themeDataURL = "https://qtoolkit.github.io/demos/assets/theme/default/theme.json";

export class TodoApp extends Application {
	protected createViewModal() {
		var modal = new TodoModal();
		
		window.onunload = function() {
			modal.save();
		}

		return TodoViewModal.create(modal.load().data);
	}

	public onReady() {
		var viewModal = this.createViewModal();
		var mainWindow = MainWindow.create({app:this, viewModal:viewModal}).maximize();
	}
	
	public static run() : TodoApp {
		var app = new TodoApp("todomvc");
		app.init({sysThemeDataURL:themeDataURL, appThemeDataURL:appThemeDataURL});
		app.run();

		return app;
	}
};
