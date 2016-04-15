// require filesystem
var fs = require('fs');

var configDir = './config';
fs.readdir(configDir, function(err, files) {
	for(var i=files.length-1; i>=0; i--) {
		var f = files[i];
		var p = configDir+'/'+f;
		var src = require(p);
		fs.writeFile('./get/'+f+'on', JSON.stringify(src.json));
	}
});
