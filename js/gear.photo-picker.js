(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'Gear_PhotoPicker';
	
	var instance;
	var castArray = Array.prototype.slice;

	var COLUMN_SPAN = 4;
	var HTML_PHOTO_ROW = '<div class="gear-photo-picker-row">';
	var URL_PHOTO_NEW = 'resource/photo-new.png';
	var db_getGearPhotos = 'photos@url(category=?)';

	var PTH_PHOTOS = 'photos/';
	
	var construct = function(qs, opt) {
		
		/**
		* private:
		**/
		var dom;
		var photos = {};
		var fn_ready = opt.ready;
		var op_category = opt.category;
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) expose.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;

		// construct the dom
		(function() {
			$(dom).addClass('active loading');
			var html = '<div class="gear-photo-picker">'
				+'<button class="gear-photo-picker-exit" type="button">X</button>'

			DB.get('photo@photo_id,caption,thmb_url(category=?)', op_category)
				.ready(function(json) {
					html += HTML_PHOTO_ROW;
					html += '<div class="gear-photo-picker-item new" photoId="new">'
							+'<img src="'+URL_PHOTO_NEW+'" />'
							+'<span>+ new photo</span>'
						+'</div>';
					var gridIndex = 1;
					for(var i=json.length-1; i>=0; i--) {
						if((gridIndex%COLUMN_SPAN) == 0) {
							html += '</div>';
							html += HTML_PHOTO_ROW;
						}
						
						var row = json[i];
						var photoId = row.photo_id;
						var url = row.thmb_url;
						html += '<div class="gear-photo-picker-item" photoId="'+photoId+'">'
								+'<img src="'+PTH_PHOTOS+url+'" />'
								+'<span>'+row.caption+'</span>'
							+'</div>';
						
						// store a reference to this data in the hash						
						photos[photoId] = row;
						
						gridIndex++;
					}
					if((gridIndex%COLUMN_SPAN) != 0) {
						html += '</div>';
					}

					$(dom).html(html)
						.find('.gear-photo-picker-item')
							.click(function() {
								var photoId = $(this).attr('photoId');
								if(photoId == 'new') {
									PhotoUploader().dialog(op_category, function(photoRow) {
										fn_ready(photoRow);
										operator.destroy();
									});
								}
								else {
									fn_ready(photos[photoId]);
									operator.destroy();
								}
							});

					$(dom).find('button.gear-photo-picker-exit')
						.click(operator.destroy);
							
					$(dom).removeClass('loading');
				});
		})();
		
		
		/**
		* public operator() ();
		**/
		function operator() {
			
		};
		
		
		/**
		* public:
		**/
			operator['destroy'] = function() {
				photos = null;
				$(dom)
					.removeClass('active loading')
					.empty();

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