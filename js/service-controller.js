(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'ServiceController';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(tub, serviceInfo) {
		
		/**
		* private:
		**/
		var dom;
		
		(function() {
			var html = '';
			html += '<div'
					+' id="service-'+serviceInfo.name+'"'
					+' class="service"'
				+'>';
			html += '<button class="service-info-toggle" type="button">'+serviceInfo.name+'</button>';
			html += '</div>';
			
			dom = $(html).appendTo(tub)
				.get(0);
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