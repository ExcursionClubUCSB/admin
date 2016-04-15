$(document).ready(function() {
	var gf = $('#full').get(0).getContext('2d');
	var gt = $('#thmb').get(0).getContext('2d');


	var tc = gt.canvas;
	tc.width = 98;
	tc.height = 100;


	var full = new Image();
	full.onload = function() {
		// fc = gf.canvas;
		// fc.width = full.width;
		// fc.height = full.height;
		// gf.drawImage(full, 0, 0);

		console.log('...');
		new Thumbnail(full, {width:98,height:100}, 3, function(dataURL, dataRGBA) {
			console.log('!');
			// console.log(dataRGBA.width, dataRGBA.height);
			// gf.clearRect(0, 0, fc.width, fc.height);
			var tmp = new Image();
			tmp.onload = function() {
				gt.drawImage(tmp, 0, 0);
			};
			tmp.src = dataURL;
		});
	};
	full.src = '/resource/full-img.jpg';
});