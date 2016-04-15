(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'ServiceLoader';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(url, qs) {
		
		/**
		* private:
		**/
		var dom;
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) pcs.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;
		
		// prepare the build the controllers from json
		var buildServiceControllers = function(json) {
			for(var i=json.length-1; i>=0; i--) {
				new ServiceController(dom, json[i]);
			}
		};
		
		// fetch the service controllers
		$.getJSON(url, function(json) {
			buildServiceControllers(json);
		}).error(XhrError);
		
		
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
	var pcs = namespace[__func__] = function() {
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
		pcs['toString'] = function() {
			return __func__+'()';
		};
		
		//
		pcs['error'] = function() {
			var args = castArray.call(arguments);
			args.unshift(__func__+':');
			console.error.apply(console, args);
		};
		
		//
		pcs['warn'] = function() {
			var args = castArray.call(arguments);
			args.unshift(__func__+':');
			console.warn.apply(console, args);
		};
		
})(window);