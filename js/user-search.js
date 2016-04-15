(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'UserSearch';
	
	var instance;
	var castArray = Array.prototype.slice;
	
	var construct = function(qs) {
		
		/**
		* private:
		**/
		var dom;
		var bar;
		var box;

		var page = {
			rowMin: 0,
			rowMax: 50,
		};

		var barInfo = {
			'fullname': 'text',
			'email': 'text',
			'phone': 'number',
			'status': 'select',
			'type': 'select',
		};

		var fulltext = {
			'fullname': true,
			'email': false,
			'phone': false,
		};

		var loadResults = function(json) {
			$('.user_info-row').remove();
			for(var i=0; i<json.length; i++) {
				var row = json[i];
				$(new UserInfoRow(row, ['m_id']))
					.bind('click', function() {
						new UserInfoCard(
							$(this).attr('data-m_id')
						);
					})
					.appendTo(dom);
			}
		};

		var inputFilters = function() {
			var qry = [];
			for(var e in barInfo) {
				var val = '';
				switch(barInfo[e]) {
					case 'number':
					case 'text':
						val = $(dom).find('.user_search-filter[data-filter-name="'+e+'"]>input').val();
						break;

					case 'select':
						val = $(dom).find('.user_search-filter[data-filter-name="'+e+'"]>select').val();
						break;
				}
				if(val) {
					qry.push(e+" like '"+(fulltext[e]?'%':'')+val.replace(/(['])/g,'\\$1')+"%'");
				}
			}
			return qry.join(',');;
		};
		
		// assure the selector returns an element
		(function() {
			var qsr = $(qs);
			if(!qsr.length) pcs.error('selector returned empty set: ',qs);
			else dom = qsr.get(0);
		})(); if(!dom) return false;
		
		
		// construct the dom
		(function() {

			var bar_label = '<div class="search-bar table-row">';
			var bar_input = '<div class="search-box table-row">';
			var barQry = '';

			// bar info
			(function() {
				var infos = [];
				var html = '';
				var filters = {};

				for(var e in barInfo) {
					infos.push(e);
					var filter;

					switch(barInfo[e]) {

						case 'number':
							// atach number only listener?
						case 'text':
							filter = $('<input type="text/html">');
							var searchThis = (function() {
								var e = this.e;
								return function(evt) {
									if(evt.type.toLowerCase() == 'keydown' && evt.which != 13) return;
									DB.get(barQry+'('+inputFilters()+')')
										.ready(loadResults);
								};
							}).apply({e:e});
							$(filter)
								.bind('keydown', searchThis)
								.bind('blur', searchThis);
							break;

						case 'select':
							filter = $('<select>'
									+'<option value="">all</optional>'
								+'</select>');

							(function() {
								var e=this.e, filter=this.filter;
								DB.get('user@'+e+'()'+e)
									.ready(function(json) {
										for(var i=0; i<json.length; i++) {
											console.log('j:',json,'[',i,']@',e);
											var value = json[i][e];
											filter.append('<option value="'+value+'">'+value+'</option>');
										}
									});
							}).apply({e:e, filter:filter});

							var searchThis = (function() {
								var e = this.e;
								return function(evt) {
									DB.get(barQry+'('+inputFilters()+')')
										.ready(loadResults);
								};
							}).apply({e:e});

							$(filter).bind('change', searchThis);
							break;
					}

					if(filter) {
						bar_label += '<div class="table-cell">'+e[0].toUpperCase()+e.substr(1)+'</div>';
						bar_input += '<div class="user_search-filter table-cell" data-filter-name="'+e+'"></div>';
						filters[e] = filter;
					}

				}

				$(dom).append(bar_label+'</div>'+bar_input+'</div>');

				for(var e in filters) {
					$(dom).find('.user_search-filter[data-filter-name="'+e+'"]').append(filters[e]);
				}

				barQry = 'user@m_id,'+infos.join(',');
			})();

			// fetch the user data
			DB.get(barQry+'()~'+page.rowMin+','+page.rowMax)
				.ready(loadResults);

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