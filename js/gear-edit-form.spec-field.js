(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'GearEditForm_SpecField';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var pint = parseInt;
	var pfloat = parseFloat;
	var simpleTest = function(a) {
		if(!a.length) return !!this.ignorable;
		return true;
	};
	
	var construct = function(ident, str) {
		
		/**
		* private:
		**/
		var field = {
			id: ident.replace(/^([a-zA-Z\_]+).*$/, '$1'),
			name: ident,
			autocomplete: 'specs',
		};
		
		(function() {
			var frmt = /^(\??)(int|str|num)(?:\(([^\)]*)\))?(?:\[([^\]]+)\])?$/.exec(str);
			if(frmt) {
			
				var ignr = frmt[1];
				var mthd = frmt[2];
				var args = frmt[3];
				var unit = frmt[4];
				
				if(ignr) field.ignorable = true;
				if(unit) field.units = unit;
				
				switch(mthd) {
					case 'int':
						$.extend(field, {
							test: function(a) {
								if(!a.length && !!this.ignorable) return true;
								var n = pint(a);
								return (n == a);
							},
							help: 'Must be a whole integer',
							filter: function(e) {
								return true;
							},
						});
						break;
						
					case 'num':
						if(args) {
							var arg = args.split(/ *[,:] */g);
							var opts = [];
							if(arg.length >= 2) {
								var as = pfloat(arg[0]);
								var ae = pfloat(arg[1]);
								var ai = arg[2]? pfloat(arg[2]): 1;
								opts.push('');
								for(var i=as; i<ae; i+=ai) {
									opts.push(i);
								}
							}
							$.extend(field, {
								test: simpleTest,
								help: 'This field is required',
								options: opts,
							});
						}
						break;
						
					default:
						field.test = simpleTest;
						break;
				}
			}
			
			else {
				var options = {'':''};
				var opts = str.split(/\//g);
				for(var i=0; i<opts.length; i++) {
					var rmatch = /^([^<]*)(?:<([^>]*)>)?$/.exec(opts[i]);
					options[rmatch[1]] = rmatch[2]? ' ('+rmatch[2]+')': '';
				}

				$.extend(field, {
					test: simpleTest,
					help: 'You must choose an option',
					options: options,
				});
			}
			
		})();
		
		return field;
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