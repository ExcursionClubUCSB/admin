(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'UserInfoRow';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(row, exempt) {
		
		/**
		* private:
		**/
		var dom;
		
		// construct the dom
		(function() {
			var html = '';
			var data = '';
			var body = '';
			for(var e in row) {
				data += ' data-'+e+'="'+row[e]+'"';
				if(exempt.indexOf(e) != -1) continue;
				body += '<div class="user_info-cell table-cell">'
						+row[e]
					+'</div>';
			}
			html = '<div class="user_info-row table-row" '+data+'>'
					+body
				'</div>';
			dom = $(html);
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
		
		
		return dom;
		
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