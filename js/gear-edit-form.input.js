(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'GearEditForm_Input';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(sup, def) {
		
		/**
		* private:
		**/
		var tub = sup.dom;
		var dom;
		var input;
		var name = def.id;
		var field = def.field;
		var nextIndex;

		// commit the autocompletion
		var autocomplete = function(suggestions) {
			$(input).autocomplete({
				source: suggestions,
				minLength: 0,
				change: function(e) {
					if($(input).val() != $(input).data('val')) {
						$(input).trigger('change');
					}
				},
				select: function() {
					setTimeout(function() {
						$(input).trigger('keypress', [true]);
					}, 50);
				},
			});
		};
		
		// construct the dom
		(function() {
			
			var autoFill = def.auto;
			var index = def.index;
			
			var fill = autoFill[name] || '';
			var isOptional = field.ignorable? true: false;
			var strDisabled = (fill || isOptional)? 'disabled': '';

			var indexAttr = fill? ''
				: ' index="'+index+'"';
			var unitsClass = ' class="input '+ (field.units? 'text-align-right': '') + '"';
			var strDisabled = (fill || isOptional)? ' disabled'
				: '';

			var isInput = !field.options;
			var hasUnits = !!field.units;

			var commonAttrs = indexAttr+unitsClass+strDisabled;
			
			// construct the input type
			var inputHtml;

			// this is a <select>
			if(!isInput) {
				inputHtml = '<select'+commonAttrs+'>';
				var opts = field.options;
				if(opts instanceof Array) {
					for(var i=0,l=opts.length; i<l; i++) {
						inputHtml += '<option value="'+opts[i]+'">'+opts[i]+'</option>';
					}
				}
				else {
					for(var e in opts) {
						inputHtml += '<option value="'+e+'" title="'+opts[e]+'">'+e+'</option>';
					}
				}
				inputHtml += '</select>';
			}

			// this is an <input>
			else {
				inputHtml = '<input'+commonAttrs+' type="text" value="'+fill+'" />';
			}

			// this input has a unit suffix
			if(hasUnits) {
				inputHtml += '<span class="input-suffix">'+field.units+'</span>';
			}
			
			var html = '<div class="gear-edit-form-input'+(isOptional?' optional':'')+(fill?' auto valid':'')+'" name="'+name+'">'
					+'<div class="gear-edit-form-input-label">'
						+(isOptional? '<input type="checkbox" />': '')
						+field.name
					+':</div>'
					+inputHtml
				+'</div>';

			dom = $(html).appendTo(tub).get(0);
			input = $(dom).find('input[type="text"],input[type="hidden"],select').get(0);

			$(dom)
				.click(function() {
					$(input).focus();
				});

			// toggle enabled on optional inputs
			$(dom).find('.gear-edit-form-input-label')
				.click(function() {
					$(this).find('input[type="checkbox"]').trigger('click');
				})
				.find('input[type="checkbox"]')
					.click(function(e) {
						e.stopPropagation();
					})
					.change(function(e) {
						var input = $(this).parent().parent().find('input[type="text"],select').get(0);
						$(input).attr('disabled', !this.checked);
						if(!this.checked) $(input).val('');
						else $(input).focus();
						$(input).parent().removeClass('valid invalid')
							.find('.input-help').remove();
					});

			$(input)
				.keypress(function(e, confirm) {
					// tab or enter
					if(e.keyCode == 13 || confirm) {
						var sel = '[class|="gear-edit-form"]>[index="'
								+(parseInt($(this).attr('index'))+1)
							+'"]';
						var next = $(tub).find(sel);
						if(next.length) next.focus();
					}
				})
				.change(function(e) {
					var value = $(this).val();
					var field = sup.required[name] || sup.special[name];

					if(field.test && !field.test(value)) {
						operator.invalidate(field.help);
					}
					else {
						operator.validate();
					}
					$(this).data('val', value);

					if(isOptional && !value.length) {
						$(this).parent()
							.removeClass('valid')
							.find('input[type="checkbox"]').trigger('click');
					}
					sup.ref.checkAllInputs();
				})
				.blur(function() {
					if(isOptional && !$(this).val().length) {
						$(this).parent()
							.removeClass('valid')
							.find('input[type="checkbox"]').trigger('click');
					}
				})
				.data('val','');

			// load autocompletion
			if(isInput && field.autocomplete) {
				var suggestions = [];

				// this is a specs field
				if(field.autocomplete == 'specs') {
					DB.get('gear@specs(category=?)', sup.getCategory())
						.ready(function(json) {
							var hash = {};
							for(var i=json.length-1; i>=0; i--) {
								var rowJson = json[i].specs;
								if(!rowJson) continue;
								var obj = JSON.parse(rowJson);
								if(!obj[field.name]) continue;
								hash[obj[field.name]] = true;
							}
							for(var e in hash) {
								suggestions.push(e);
							}
							autocomplete(suggestions);
						});
				}

				// this is a general field
				else if(!fill) {
					DB.get('gear@'+name+'(category=?)'+name, sup.getCategory())
						.ready(function(json) {
							for(var i=json.length-1; i>=0; i--) {
								suggestions.push(json[i][name]);
							}
							autocomplete(suggestions);
						});
				}
			}
					
			nextIndex = index + !fill;
		})();

		
		/**
		* public operator() ();
		**/
		var operator = function() {
			
		};
		
		
		/**
		* public:
		**/
			operator['getNextIndex'] = function() {
				return nextIndex;
			};

			operator['getDom'] = function() {
				return dom;
			};

			operator['getInput'] = function() {
				return input;
			};

			operator['getName'] = function() {
				return name;
			};

			operator['invalidate'] = function(reason, focus) {
				$(input).parent()
					.find('.input-help').remove();
				$(input).parent()
					.removeClass('valid')
					.addClass('invalid')
					.append('<div class="input-help">'+reason+'</div>');
				if(focus) $(input).focus().select();
			};

			operator['validate'] = function() {
				$(input).parent()
					.find('.input-help').remove();
				$(input).parent()
					.removeClass('invalid')
					.addClass('valid');
			};

			operator['required'] = function() {
				return !field.ignorable;
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