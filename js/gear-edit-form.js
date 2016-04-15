(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'GearEditForm';

	var PTH_PHOTOS = 'photos/';
	
	var instance;
	
	var requiredFields = {
		department: {
			name: 'department(s)',
			test: function(a) {
				return /^[a-z\-\/ ]{5,}$/.test(a);
			},
			help: 'Only lower-case letters (a-z), dashes (-), slashes(/) and spaces ( ). Minimum 5 characters long',
			autocomplete: true,
			agnostic: true,
		},
		category: {
			name: 'category',
			test: function(a) {
				return /^[a-z ]{3,}$/.test(a);
			},
			help: 'Only lower-case letters (a-z) and spaces ( ). Minimum 3 characters long',
			autocomplete: true,
			agnostic: true,
		},
		rfid: {
			name: 'rfid tag',
			test: function(a) {
				return /^[0-9]{10}$/.test(a);
			},
			help: 'RFID must be 10 digits long',
			confirm: function(a, fn) {
				DB.get('gear@(rfid=?)', a)
					.ready(function(res) {
						if(res.length) {
							fn(false, 'Tag already in use');
						}
						else {
							fn(true);
						}
					});
			},
			fresh: true,
		},
		make: {
			name: 'manufacturer',
			test: function(a) {
				return /^.{2,}$/.test(a);
			},
			help: 'Minimum 2 characters long',
			autocomplete: true,
		},
	};

	var construct = function(qs, spec) {

		var reset = function(hard) {
			if(hard) {
				return new expose(qs, spec);
			}
			enableForms(true);
			for(var e in inputs) {
				if(requiredFields[e] && requiredFields[e].fresh) {
					$(inputs[e].getInput())
						.val('')
						.parent()
							.removeClass('valid invalid');
				}
				else if(specialFields[e] && false) {
					$(inputs[e].getInput())
						.val('')
						.parent()
							.removeClass('valid invalid');
				}
			}
			$('[class|="gear-edit-form"]>[index="0"]').focus();
		};
		
		var errorHandler = function(e) {
			if(e.field) {
				enableForms(true);
				inputs[e.field].invalidate(e.help, true);
			}
			else {
				this.banner('Error: '+e);
			}
		};

		var successHandler = function(json) {
			reset();
			this.banner('Gear was addedd successfully');
		};

		var enableForms = function(onoff) {
			if(!onoff) {
				$(dom).find('.gear-edit-form-button.save')
					.removeClass('valid').addClass('busy');
			}
			else {
				$(dom).find('.gear-edit-form-button.save')
					.removeClass('valid busy');
			}
			$(dom).find('[class|="gear-edit-form"]:not(.auto) input,select,button')
				.attr('disabled',!onoff);
		};

		/**
		* private:
		**/
		var dom;
		var specialFields = {};
		var notify = new Message(errorHandler, successHandler);
		var inputs = {};
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) pcs.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;

		var resetButton = function(index) {
			return $('<div class="gear-edit-form-button reset">'
				+'<button index="'+index+'">reset</button>'
			+'</div>')
				.click(function() {
					reset(true);
				});
		};

		var saveButton = function(index) {
			return $('<div class="gear-edit-form-button save">'
				+'<button index="'+index+'"></button>'
			+'</div>')
				.click(function(evt) {
					if($(this).hasClass('valid')) {
						enableForms(false);
						var form = {};
						for(var e in requiredFields) {
							var value = $(dom).find('.gear-edit-form-input[name="'+e+'"] .input').val();
							form[e] = value;
						}
						var specs = {};
						for(var e in specialFields) {
							specs[e] = $(dom).find('.gear-edit-form-input[name="'+e+'"] .input').val();
						}
						form.specs = JSON.stringify(specs);
						form.photo_id = $(dom).find('.gear-edit-form-input.img input').val();
						
						$.ajax({
							url: './data/gear/new',
							method: 'POST',
							data: form,
							dataType: 'json',
							success: notify,
						});
					}
				}).get(0);
		};

		var getCategory = function() {
			var input_category = $(dom).find('.gear-edit-form-input.valid[name="category"]>input');
			if(!input_category.length) {
				return console.error('no valid category found!');
			}
			return input_category.val();
		};
		
		var imgButton = function(index) {
			var inp = $('<div class="gear-edit-form-input img">'
				+'<div>photo:</div>'
				+'<button index="'+index+'"></button>'
				+'<input type="hidden" value="" name="photo" />'
			+'</div>')
				.click(function(evt) {
					$(this).find('button').focus();
				})
				.find('button')
					.focus(function() {
						$(this).parent().addClass('focus');
					})
					.blur(function() {
						$(this).parent().removeClass('focus');
					})
					.click(function(evt) {
						var mThis = this;
						new Gear_PhotoPicker('#overlay', {
							category: getCategory(),
							ready: function(img) {
								$(mThis)
									.css({
										'background-image': 'url("'+PTH_PHOTOS+img.thmb_url+'")'
									})
									.parent()
										.addClass('valid')
									.find('input[type="hidden"]')
										.val(img.photo_id);

								operator.checkAllInputs();
							},
						});
					})
				.parent().get(0);
			inputs['photo_id'] = {
				getDom: function(){return $(inp).get(0);},
				getName: function(){return 'photo_id';},
				getInput: function(){return $(inp).find('input[type="hidden"]');},
				validate: function(){
					$(inp)
						.removeClass('invalid')
						.addClass('valid');
				},
				invalidate: function(){
					$(inp)
						.removeClass('valid')
						.addClass('invalid');
				},
				required: function() {
					return true;
				},
			};
			return inp;
		};
		
		var childClassAccess = {
			dom: dom,
			required: requiredFields,
			special: specialFields,
			ref: operator,
			getCategory: getCategory,
		};
		
		// construct the dom
		(function() {
			var autoFill = spec.fill;
			var index = 0;
			for(var e in requiredFields) {
				var field = $.extend(true, {}, requiredFields[e]);
				if(spec.optional && spec.optional.indexOf(e) != -1) field.ignorable = true;
				var input = new GearEditForm_Input(childClassAccess, {
						id: e,
						field: field,
						auto: autoFill,
						index: index,
						parent: operator,
					});
				inputs[input.getName()] = input;
				index = input.getNextIndex();
			}
			
			var specs = spec.specs;
			for(var e in specs) {
				var field = new GearEditForm_SpecField(e, specs[e]);
				specialFields[field.id] = field;
				var input = new GearEditForm_Input(childClassAccess, {
					id: field.id,
					field: field,
					auto: autoFill,
					index: index,
					parent: operator
				});
				inputs[input.getName()] = input;
				index = input.getNextIndex();
			}
			
			$(dom)
				.append(imgButton(index++))
				.append(saveButton(index++))
				.append(resetButton(index++))
				.find('.gear-edit-form-input:not(.optional)>[index]').eq(0)
					.focus();
			
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
				$(dom).empty();
			};
			
			operator['checkAllInputs'] = function() {				
				$('.gear-edit-form-button.save').removeClass('valid');
				var sanitary = true;
				for(var e in inputs) {
					if(inputs.hasOwnProperty(e)) {
						var input = inputs[e];
						if(input.required() && !$(input.getDom()).hasClass('valid')) {
							sanitary = false;
						}
					}
				}
				if(sanitary) {
					$('.gear-edit-form-button.save').addClass('valid');
				}
			};
			
			operator['getRequiredField'] = function(e) {
				return requiredFields[e];
			};
			
			operator['getSpecial'] = function(e) {
				return specialFields[e];
			};
		
		
		return operator;
		
	};
	
	
	
	/**
	* public static operator() ()
	**/
	var expose = namespace[__func__] = function() {
		if(this !== namespace) {
			if(instance) instance.destroy();
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
			var args = Array.cast(arguments);
			args.unshift(__func__+':');
			console.error.apply(console, args);
		};
		
		//
		expose['warn'] = function() {
			var args = Array.cast(arguments);
			args.unshift(__func__+':');
			console.warn.apply(console, args);
		};
		
})(window);