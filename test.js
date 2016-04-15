
// require auth
var auth = require('../lib/auth.js');

exports.handler = function(request, response, parsedUrl, utils, service) {

	var db = auth.open();

	var fail = function(e) {
		if(e.fix) {
			utils.redirect(response, e.fix);
			db.end();
		}
		else {
			if(typeof e == 'object') e = JSON.stringify(e);
			response.end(e || '"auth failed"');
			db.end();
		}
	};

	auth(db, request, fail, function(who) {
		var p = false;
		p = p || who.can('use_admin_panel');
		if(p) return fail(p);

		service();
		db.end();
	});

	return true;
};