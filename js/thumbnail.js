(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'Thumbnail';
	
	var instance;
	var castArray = Array.prototype.slice;

	//returns a function that calculates lanczos weight
	var lanczosCreate = function(lobes) {
		return function(x) {
			if(x > lobes) return 0;
			x *= Math.PI;
			if(Math.abs(x) < 1e-16) return 1;
			var xx = x / lobes;
			return Math.sin(x) * Math.sin(xx) / x / xx;
		};
	};
	
	
	// img: image element, sx: scaled width, lobes: kernel radius
	var construct = function(img, dim, lobes, callback) { 

		var grab_width,
			grab_height,
			offset_x,
			offset_y;

		(function() {
			var s_w = img.naturalWidth || img.width,
				s_h = img.naturalHeight || img.height,
				s_cx = Math.floor(s_w * 0.5),
				s_cy = Math.floor(s_h * 0.5),
				s_ar = s_w / s_h,

				d_w = dim.width,
				d_h = dim.height,
				d_ar = d_w / d_h;

			// (ar > 1): landscape, (ar < 1): portrait
			if(s_ar >= 1) {
				grab_height = s_h;
				grab_width = Math.ceil(grab_height * d_ar);
				offset_x = s_cx - Math.round(grab_width * 0.5);
				offset_y = 0;
			}
			else if(s_ar < 1) {
				grab_width = s_w;
				grab_height = Math.ceil(grab_width / d_ar);
				offset_y = s_cy - Math.round(grab_height * 0.5);
				offset_x = 0;
			}
		})();
		
		/**
		* private:
		**/
		var canvas = document.createElement('canvas'),
			ctx,
			lanczos = lanczosCreate(lobes),
			ratio = grab_width / dim.width,
			rcp_ratio = 2 / ratio,
			range2 = Math.ceil(ratio * lobes * 0.5),
			cacheLanc = {};

		var src_width,
			src_height,
			src_data,

			dest_width,
			dest_height,
			dest_data;

		var process1 = function(u) {
			var center_x = (u + 0.5) * ratio;
			var icenter_x = Math.floor(center_x);
			for(var v=0; v<dest_height; v++) {

				var a, r, g, b;
				a = r = g = b = 0;

				var center_y = (v + 0.5) * ratio;
				var icenter_y = Math.floor(center_y);
				var i_final = icenter_x + range2;
				for(var i=icenter_x-range2; i<=i_final; i++) {

					if(i<0 || i>=src_width) continue;
					var f_x = Math.floor(1000 * Math.abs(i - center_x));
					if(!cacheLanc[f_x]) cacheLanc[f_x] = {};

					var j_final = icenter_y + range2;
					for(var j=icenter_y-range2; j<=j_final; j++) {

						if(j<0 || j>=src_height) continue;
						var f_y = Math.floor(1000 * Math.abs(j - center_y));
						if(cacheLanc[f_x][f_y] == undefined) 
							cacheLanc[f_x][f_y] = lanczos(Math.sqrt(Math.pow(f_x * rcp_ratio, 2) + Math.pow(f_y * rcp_ratio, 2)) * 0.001);

						weight = cacheLanc[f_x][f_y];
						if(weight > 0) {
							var idx = (j * src_width + i) * 4;
							a += weight;
							r += weight * src_data[idx];
							g += weight * src_data[idx + 1];
							b += weight * src_data[idx + 2];
						}
					}
				}
				var idx = (v * dest_width + u) * 3;
				dest_data[idx] = r / a;
				dest_data[idx + 1] = g / a;
				dest_data[idx + 2] = b / a;
			}

			if(++u < dest_width)
				window.setTimeout(process1, 0, u);
			else
				window.setTimeout(process2, 0);
		};

		var process2 = function() {
			canvas.width = dest_width;
			canvas.height = dest_height;

			ctx.drawImage(img, 0, 0);
			var src = ctx.getImageData(0, 0, dest_width, dest_height);
			
			var idx, idx2;
			for(var i=0; i<dest_width; i++) {
				for(var j=0; j<dest_height; j++) {
					idx = (j * dest_width + i) * 3;
					idx2 = (j * dest_width + i) * 4;
					src.data[idx2] = dest_data[idx];
					src.data[idx2 + 1] = dest_data[idx + 1];
					src.data[idx2 + 2] = dest_data[idx + 2];
				}
			}

			ctx.putImageData(src, 0, 0);
			callback(
				ctx.canvas.toDataURL('image/jpeg', 0.75)
			);
		};


		// thumbnail resize image
		(function() {
		    canvas.width = img.naturalWidth;
		    canvas.height = img.naturalHeight;
		    canvas.style.display = 'none';
		    ctx = canvas.getContext('2d');
		    ctx.drawImage(img, 0, 0);
		    // console.log(offset_x,',',offset_y,'; ',grab_width,',',grab_height);

		    var src = ctx.getImageData(offset_x, offset_y, grab_width, grab_height);
			src_width = src.width;
			src_height = src.height;
			src_data = src.data;

			dest_width = dim.width;
			dest_height = dim.height;
		    dest_data = new Array(dest_width * dest_height * 3);

		    window.setTimeout(process1, 0, 0);
		})();

		/**
		* public operator() ();
		**/
		var operator = function() {
			
		};
		
		
		/**
		* public:
		**/
			operator[''] = function() {
				
			};
		
		
		return operator;
		
	};

	
	/**
	* public static operator() ()
	**/
	var expose = namespace[__func__] = function() {
		if(this !== namespace) {
			instance = construct.apply(this, arguments);
			return instance;
		}
		else {
			return instance;
		}
	};
	
	
	
	/**
	* public static:
	**/
		
		//
		expose['toString'] = function() {
			return __func__+'()';
		};
		
		//
		expose['error'] = function() {
			var args = castArray.call(arguments);
			args.unshift(__func__+':');
			console.error.apply(console, args);
		};
		
		//
		expose['warn'] = function() {
			var args = castArray.call(arguments);
			args.unshift(__func__+':');
			console.warn.apply(console, args);
		};
		
})(window);