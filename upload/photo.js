
var fs = require('fs');
var path = require('path');

var Db = require('../../lib/db.js');
var fetchPost = require('../../lib/post.js');

var TABLE_NAME = 'photo';

exports.handler = function(request, response) {

	var schema = new Db('information_schema');
	var db = new Db();

	var fail = function(e) {
		console.error(e);
		schema.end(); db.end();
		if(!e.error) e = { error: e };
		response.end(
			JSON.stringify(e)
		);
	};

	fetchPost(request, function(post) {

		var postFullImage = /^data:image\/([a-z]+);base64,(.*)$/.exec(post.full);
		var fullImageType = postFullImage[1];
		var fullImageData = postFullImage[2];

		var postThmbImage = /^data:image\/([a-z]+);base64,(.*)$/.exec(post.thmb);
		var thmbImageType = postThmbImage[1];
		var thmbImageData = postThmbImage[2];

		fullImageType = /^jp(?:e|g|eg)$/.test(fullImageType)? 'jpg': fullImageType;
		thmbImageType = /^jp(?:e|g|eg)$/.test(thmbImageType)? 'jpg': thmbImageType;

		// get the auto increment of the next photos id
		schema('tables').select('auto_increment', {
			table_schema: db.getDatabaseName(),
			table_name: TABLE_NAME,
		}, fail, function(schemaResults) {
			schema.end();

			if(!schemaResults.length) return fail('no auto-inc');
			var autoInc = schemaResults[0].auto_increment;

			var fullUrl = 'full/'+autoInc+'.'+fullImageType;
			var thmbUrl = 'thmb/'+autoInc+'.'+thmbImageType;

			var fullSrc = path.resolve('../photos/'+fullUrl);
			var thmbSrc = path.resolve('../photos/'+thmbUrl);

			fs.writeFile(fullSrc, fullImageData, 'base64', function(err) {
				if(err) return fail('failed to save full image');

				fs.writeFile(thmbSrc, thmbImageData, 'base64', function(err) {
					if(err) return fail('failed to save thmb image');

					var row = {
						photo_id: autoInc,
						category: post.category,
						caption: post.caption,
						full_url: fullUrl,
						full_src: fullSrc,
						thmb_url: thmbUrl,
						thmb_src: thmbSrc,
					};

					db(TABLE_NAME).insert(row, fail, function() {
						response.end(
							JSON.stringify(row)
						);

						db.end();
					});
				});
			})
		});

	});

	return true;
};