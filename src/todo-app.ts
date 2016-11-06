import {Application} from "qtk";
import {MainWindow} from "./views/main-window"
import {TodoModel} from "./models/todo-model";
import {TodoViewModel}  from "./view-models/todo-view-model";

var appThemeDataURL = "https://qtoolkit.github.io/qtk-todo-mvc/assets/theme/default/theme.json";
var themeDataURL = "https://qtoolkit.github.io/demos/assets/theme/default/theme.json";

export class TodoApp extends Application {
	protected createViewModel() {
		var model = new TodoModel();
		
		window.onunload = function() {
			model.save();
		}

		return TodoViewModel.create(model.load().data);
	}

	public onReady() {
		var viewModel = this.createViewModel();
		var mainWindow = MainWindow.create({app:this, viewModel:viewModel}).maximize();
	}
	
	public static run() : TodoApp {
		var app = new TodoApp("todomvc");
		app.init({sysThemeDataURL:themeDataURL, appThemeDataURL:appThemeDataURL});
		app.run();

		return app;
	}
};
