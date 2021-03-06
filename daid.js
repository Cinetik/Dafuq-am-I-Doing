#!/usr/bin/env node

'use strict';
var config = require('./config/default.json');
var Mantis = require('./lib/mantis');
var Table = require('cli-table');
var userargs = process.argv;

userargs.splice(0, 2);

var mantisClient = new Mantis(config.url, config.username, config.password);
mantisClient.initialize().then(function(client){
	mantisClient.getUserIssues().then(function(result) {
		var table = new Table({
			head: ['ID', 'Project', 'Description','Status']
		});
		if (result.item instanceof Array) {
			result.item.forEach(function(issue) {
				table.push([issue.id.$value, issue.project.name.$value, issue.summary.$value, issue.status.name.$value]);
			});
			console.log(table.toString());
		}
		else if (result.item){
			var issue = result.item;
			table.push([issue.id.$value, issue.project.name.$value, issue.summary.$value, issue.status.name.$value]);
			console.log(table.toString());
		} else{
			console.log('You have nothing assigned. Dafuq you doing ?!');
		}
	})
	.catch(function(reason) {
		console.error(reason);
	});
});
