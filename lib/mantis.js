var request = require('request'),
    soap    = require('soap');

function MantisConnect(url, username, password) {
    this.url = url;
    this.client = null;
	this.username = username;
	this.password = password;
    this.req = request.defaults({
        auth: {
            username: username,
            password: password
        }
    });
}

MantisConnect.prototype.initialize = function() {
    var self = this;

    return new Promise(function(resolve, reject) {
        soap.createClient(self.url, {
            request: self.req
        }, function(err, client) {
            if (err) {
				console.error(err);
                return reject('Failed to create client.');
            }
            self.client = client;

            return resolve();
        });
    });
};


MantisConnect.prototype.getUserIssues = function() {
	var self = this;
    return this.query('mc_project_get_issues_for_user', {
		username: this.username,
		password: this.password,
		target_user: {
			name: this.username
		},
        project_id: 0,
        page_number: 0,
        per_page: -1,
		filter_type: 'assigned',
    })
    .then(function(result) {
		return result.return;
    });
};



MantisConnect.prototype.query = function(func, args) {
    var self = this;

    // Set username and password
    args.username = this.username;
    args.password = this.password;

    return new Promise(function(resolve, reject) {
        self.client[func](args, function(err, result) {
            if (err) {
				console.error(err);
                return reject('Failed to execute query "' + func + '".');
            }
            return resolve(result);
        });
    });
};


module.exports = MantisConnect;
