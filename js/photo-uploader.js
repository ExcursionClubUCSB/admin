(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'PhotoUploader';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(qs) {
		
		/**
		* private:
		**/
		var dom;
		var modal;
		var input;
		var image;
		var complete;

		var upload = {};
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) pcs.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;

		var uploadImage = function() {
			if(upload.caption && upload.thmb) {

				$(modal).find('.photo-upload-modal-progress')
					.removeClass('busy-thumbnailing')
					.removeClass('waiting-caption')
					.addClass('busy-uploading');

				$(modal).find('.photo-upload-modal-label')
					.remove();

				$.ajax({
					url: '/upload/photo',
					method: 'POST',
					data: upload,
					dataType: 'json',
					success: function(json) {
						complete(json);
						$(modal).remove();
						instance = null;
					},
				});
			}
		};

		var createThumbnail = function() {
			new Thumbnail(image, {width:98, height:100}, 3, function(dataUrl) {
				upload.thmb = dataUrl;
				uploadImage();
				$(modal).find('.photo-upload-modal-progress')
					.removeClass('busy-thumbnailing')
					.addClass('waiting-caption');
			});
		};
		
		var readImage = function(file) {
			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(file) {
				return function(e) {
					upload.full = e.target.result;
					var modalHtml = '<div class="photo-upload-modal">'
							+'<img src="'+upload.full+'" />'
							+'<div class="photo-upload-modal-label">'
								+'<span>Enter a label for this photo:</span>'
								+'<button class="theme-grass-gradient" type="button" intent="label">ok</button>'
								+'<input type="text" />'
							+'</div>'
							+'<div class="photo-upload-modal-progress busy-thumbnailing">'
								+'<button type="button" intent="cancel">cancel</button>'
							+'</div>'
						+'</div>';
					modal = $(modalHtml).appendTo(dom).get(0);

					image = $(modal).find('img').get(0);
					$(image).on('load', function() {
						createThumbnail();
					});
					
					$(modal).find('.photo-upload-modal-label')
						.click(function() {
							$(this).find('input').focus();
						});

					$(modal).find('button[intent="label"]').click(function(e) {
						var caption = $(this).parent().find('input').val();
						if(/[^ \t]/.test(caption)) {
							e.stopPropagation();
							upload.caption = caption;
							$(modal).find('.photo-upload-modal-label').remove();
							uploadImage();
						}
					});

					$(modal).find('button[intent="cancel"]').click(function(e) {
						$(modal).remove();
						instance = null;
					});

					$(modal).find('input').keydown(function(e) {
						var caption = $(this).val();
						if(e.which == 13 && /[^ \t]/.test(caption)) {
							upload.caption = caption;
							$(modal).find('.photo-upload-modal-label').remove();
							uploadImage();
						}
					}).focus();
				};
			})(file);

			// Read in the image file as a data URL.
			reader.readAsDataURL(file);
		};
		
		// construct the dom
		(function() {
			input = $('<input type="file" accept="image/*" class="photo-upload" />')
				.appendTo(dom)
				.get(0);

			$(input)
				.click(function(e) {
					e.stopPropagation();
				})
				.change(function() {
					readImage(this.files[0]);
				});
		})();
		
		
		/**
		* public operator() ();
		**/
		var operator = function() {
			
		};
		
		
		/**
		* public:
		**/
			operator['dialog'] = function(category, fn) {
				complete = fn;
				upload = {
					category: category,
				};
				$(input).trigger('click');
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
			if(!instance) {
				instance = construct.apply({}, [document.body]);
			}
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