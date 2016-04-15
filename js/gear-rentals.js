(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'GearRentals';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(qs) {
		
		/**
		* private:
		**/
		var dom;
		var list;
		var GEAR = {};
		var ready = new ReadyHandler();

		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) pcs.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;

		var listItems = function() {
			return $(list).find('.gear-rental-list-item');
		};

		var loadResults = function(rentals) {
			listItems().remove();
			for(var i=rentals.length-1; i>=0; i--) {
				var rental = rentals[i];
				var item = GEAR[rental.g_id];
				$(list).append(
					// new RentalItem(rental, item)
				);
			}
		};
		
		// construct the dom
		(function() {

			list = $('<div class="gear-rental-list table">'
				+'</div>').appendTo(dom);


			// download the entire gear database
			DB.get('gear@()')
				.ready(function(gearResults) {
					for(var i=gearResults.length-1; i>=0; i--) {
						var item = gearResults[i];
						GEAR[item.g_id] = item;
					}
					ready('gear')();
				});

			// 
			DB.get('gear@category()category')
				.ready(function(categoryOpts) {
					var html = '';
					for(var i=categoryOpts.length-1; i>=0; i--) {
						var opt = categoryOpts[i];
						html += '<option value="'+opt+'">'+opt+'</option>';
					}
					$(dom).find('.gear-rental-field[data-field="category"]')
						.empty()
						.append(html);
				});

			DB.get('rental@(status=0)')
				.ready(function(rentalResults) {
					ready('gear', function() {
						loadResults(rentalResults);
					});
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