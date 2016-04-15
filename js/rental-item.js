(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'RentalItem';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(rental, item, okay) {
		
		/**
		* private:
		**/
		var html;
		var ready = new ReadyHandler();

		var user;
		var staffRent;
		var staffReturn;
		var userReady = false;
		var staffRentReady = false;
		var staffReturnReady = false;

		var dateHtml = function(timestamp) {
			return Date.format('m/d/y', timestamp*1000);
		};

		var daysDifference = function(seconds) {
			var days = Math.round(seconds / (60*60*24));
			if(days % 7 == 0) return Math.round(days/7)+' weeks';
			return days+' days';
		};

		var fields = [
			'Date Rented': dateHtml(rental.date_rented),
			'Date Due Back': (function() {
				return '<em class="date">'+dateHtml(rental.date_due)+'<em/>'
				+'<em class="duration">('+daysDifference(rental.date_due-rental.date_rented)+')</em>';
			})(),
		];

		if(rental.status) {
			fields['Date Returned'] = dateHtml(rental.date_returned);
		}

		// construct the html
		var allReady = function() {
			var body = '';
			for(var e in fields) {
				body += '<span class="gear-rental-list-item-cell">'
					+fields[e]
				+'</span>';
			}

			html = '<div class="gear-rental-list-item table-cell">'
				+body
			+'</div>';

			okay(html);
		}
		

		ready('user', function() {
			userReady = true;
			if(staffRentReady && staffReturnReady) {
				allReady();
			}
		});

		ready('staffRent', function() {
			staffRentReady = true;
			if(userReady && staffReturnReady) {
				allReady();
			}
		});

		ready('staffReturn', function() {
			staffReturnReady = true;
			if(userReady && staffRentReady) {
				allReady();
			}
		});


		DB.get('user@(m_id=?)', rental.m_id)
			.ready(function(userResults) {
				user = userResults[0];
				fields['Who'] = user.fullname;
				ready('user')();
			});

		DB.get('user@(m_id=?)', rental.who_rented)
			.ready(function(staffRentResults) {
				staffRent = staffRentResults[0];
				fields['Rental Approved By'] = staffRent.fullname;
				ready('staffRent')();
			});

		DB.get('user@(m_id=?)', rental.who_returned)
			.ready(function(staffReturnResults) {
				staffReturn = staffReturnResults[0];
				fields['Return Approved By'] = staffReturn.fullname;
				ready('staffReturn')();
			});
		
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