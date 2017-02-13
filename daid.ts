import {MantisConnect} from "./lib/mantis";
import {Config} from "./config/config";
import * as TableLayout from "table-layout";

let config: Config = require("./config/default");
let mantis = new MantisConnect(config.url, config.username, config.password);


mantis.initialize().then(() => {
	mantis.getUserIssues().then( (issues) => {
		let data = new Array();
		if (issues.item instanceof Array) {
			issues.item.forEach((issue) => {
				data.push({
					"id": issue.id.$value,
					"project": issue.project.name.$value,
					"description": issue.summary.$value,
					"status": issue.status.name.$value
				});
			});
		} else if (issues.item) {
			const issue = issues.item;
				data.push({
					"id": issue.id.$value,
					"project": issue.project.name.$value,
					"description": issue.summary.$value,
					"status": issue.status.name.$value
				});
		} else {
			console.log("You have nothing assigned. Dafuq you doing ?!");
		}
		const table = new TableLayout(data);
		console.log(table.toString());
	});
}).catch((reason) => {
	console.log("err reason: ", reason);
});
