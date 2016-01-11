#!/usr/bin/env node

'use strict';
var config = require('config');
var Mantis = require('./lib/mantis');
var Table = require('cli-table');
var userargs = process.argv;

userargs.splice(0, 2);

var mantisClient = new Mantis(config.url, config.username, config.password);
mantisClient.initialize().then(function(client){
	mantisClient.getUserIssues().then(function(result) {
		var table = new Table({
			head: ['ID', 'Project', 'Description']
		});
		// result.item.forEach(function(issue) {
		// 	table.push([issue.id.$value, issue.project.name.$value, issue.summary.$value]);
		// });
		table.push([12341, 'random project', 'fix the godamm bug !']);
		table.push([3452, 'Slack config', 'Make hubot say hello on ssh connect']);
		table.push([64241, 'Take over the world', 'Make a plan for tonight']);
		console.log(table.toString());
	})
	.catch(function(reason) {
		console.error(reason);
	});
});
