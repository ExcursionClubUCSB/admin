(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'GearManager';
	
	var instance;
	var castArray = Array.prototype.slice;

	var st_navbarMenu_shown = false? ' shown': '';
	
	
	var construct = function(qs) {
		
		/**
		* private:
		**/
		var dom;
		var domNewGear;
		var domNavbar;
		var domForm;
		var newGearSpec;
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) expose.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;
		
		domNewGear = $(dom).find('#gear-add_new').get(0);
		domNavbar = $(dom).find('.new_gear-navbar').get(0);
		domForm = $(dom).find('.new_gear-form').get(0);
		
		// construct the dom
		(function() {
			// this is for entering a new item of gear
			$.getJSON('./get/gear-edit.json', function(json) {
				newGearSpec = json;
				var navbar = '';
				for(var e in json) {
					var list = json[e];
					navbar += '<div class="new_gear-navbar-menu'+st_navbarMenu_shown+'" key="'+e+'">'
						+'<span>'+e+'</span>'
					for(var i=0,l=list.length; i<l; i++) {
						var spec = list[i];
						navbar += '<div class="new_gear-navbar-menu-item" under="'+e+'" key="'+i+'">'
								+spec.name
							+'</div>';
					}
					navbar += '</div>';
				}
				$(navbar).appendTo(domNavbar)
					.click(function(e) {
						var key = $(this).attr('key');
						$(this).toggleClass('shown');
					})
					.find('.new_gear-navbar-menu-item')
						.click(function(e) {
							e.stopPropagation();
							loadForm(this);
						});
			});
		})();
		
		
		// loads the form for adding a new gear item
		var loadForm = function(elmt) {
			$('.selected-item').removeClass('selected-item');
			var item = $(elmt).addClass('selected-item');
			var under = item.attr('under');
			var key = item.attr('key');
			var spec = newGearSpec[under][key];
			new GearEditForm(domForm, spec);
		};
		
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