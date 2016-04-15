(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'UserInfoCard';
	
	var instance;
	var castArray = Array.prototype.slice;
	var DOM_ROOT = document.body;

	var selectElement = function(qs) {
		var qsr = $(qs);
		if(!qsr.length) return expose.error('selector returned empty set: ',qs);
		return qsr.get(0);
	};

	function timeConverter(UNIX_timestamp){
 		var a = new Date(UNIX_timestamp*1000);
 		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
  	   	var month = months[a.getMonth()];
     		var date = a.getDate();
     		var hour = a.getHours();
     		var min = a.getMinutes();
     		var sec = a.getSeconds();
     		var time = month+' '+date+', '+year;//+' '+hour+':'+min+':'+sec ;
     		return time;
 	}

	var construct = function(m_id) {
		
		/**
		* private:
		**/
		// assure the selector returns an element
		var root = DOM_ROOT;

		var user,
			rfid,
			certification,
			permission,
			rental;

		var loadUserInfo = function(json) {
			user = json[0];
			$(root).find('.user_info_card-title').html(
										'<p>'
										+user.fullname+'&nbsp;'
										+'<img id="edit-name" style="height:15px; margin:0 auto" src="/photos/thmb/edit.png"/>'
										+'</p>'
										);
			var staff_class = user.type=='staff'? (user.status=='active'? 'inactive': 'active'): user.type;
			var joinDate = timeConverter(user.date_joined);
			var expDate = timeConverter(user.date_expires);
			var thmb_url = "/photos/member_photos/thmb/"+user.m_id.toString()+".jpg";
			console.log("/photos/member_photos/thmb/"+user.m_id.toString()+".jpg");
                        $.ajax({
                                url: thmb_url,
                                async: false,
                                success: function(data){
                                },
                                error: function(data){
                                        thmb_url = "/photos/member_photos/thmb/blank-profile-hi.png";
                                },
                        });
			var userInfo = ''
				+'<div style="display:inline-block; width:50;">'
					+'&nbsp;'
				+'</div>'
				+'<div style="display:inline-block;">'
					+'<img id="user_photo" class="user_info_card-badges-icon" style="height:100px; margin:0 auto"src="'+thmb_url+'"/>'
                               	+'</div>'
				+'<div style="display:inline-block; width:50;">'
                                        +'&nbsp;'
                                        +'&nbsp;'
                                +'</div>'
				+'<div style="display:inline-block;">'
					+'<div class="user_info_card-info-item" data-type="phone">'+Format.phone(user.phone)+' <img id="edit-phone" style="height:15px; margin:0 auto" src="/photos/thmb/edit.png"/></div>'
					+'<div class="user_info_card-info-item" date-type="email">'+user.email+' <img id="edit-email" style="height:15px; margin:0 auto" src="/photos/thmb/edit.png"/></div>'
					+'<div class="user_info_card-info-item" date-type="date_expires">'+'Joined: ' + joinDate+'</div>'
					+'<div class="user_info_card-info-item" date-type="date_expires">'+'Expires: ' + expDate+'</div>'
					+'<br>'
					+'<br>'
				+'</div>'
			+'';

			$(root).find('.user_info_card-info').html(userInfo);

			$("#edit-name").click(function(){
				var new_name=prompt('Edit name:', user.fullname);
        			if(new_name) {
					DATA.action('member/changename', {
						m_id: user.m_id,
						fullname: new_name,
					}, function(response) {
						if(response.error) return Blip.error(response.error);
						$(root).find('.user_info_card-title').html(
                                                                                '<p>'+new_name+'</p>'
                                                );
					});
				};
			});

			$("#edit-phone").click(function(){
                                var new_phone=prompt('Edit phone number:', user.phone);
                                if(new_phone) {
                                        DATA.action('member/changephone', {
                                                m_id: user.m_id,
                                                phone: new_phone,
                                        }, function(response) {
                                                if(response.error) return Blip.error(response.error);
                                                $(root).find('.user_info_card-info').html(
                                                	'<div style="display:inline-block; width:50;">'
                                        			+'&nbsp;'
                                			+'</div>'
                                			+'<div style="display:inline-block;">'
                                        			+'<img id="user_photo" class="user_info_card-badges-icon" style="height:100px; margin:0 auto"src="'+thmb_url+'"/>'
                                			+'</div>'
                                			+'<div style="display:inline-block; width:50;">'
                                        			+'&nbsp;'
                                        			+'&nbsp;'
                                			+'</div>'
                                			+'<div style="display:inline-block;">'
                                        			+'<div class="user_info_card-info-item" data-type="phone">'+Format.phone(new_phone)+'</div>'
                                        			+'<div class="user_info_card-info-item" date-type="email">'+user.email+'</div>'
                                        			+'<div class="user_info_card-info-item" date-type="date_expires">'+'Joined: ' + joinDate+'</div>'
                                        			+'<div class="user_info_card-info-item" date-type="date_expires">'+'Expires: ' + expDate+'</div>'
                                        			+'<br>'
                                        			+'<br>'
                               				+'</div>'
                                                );
                                        });
                                };
                        });

			$("#edit-email").click(function(){
                                var new_email=prompt('Edit Email Address::', user.email);
                                if(new_email) {
                                        DATA.action('member/changeemail', {
                                                m_id: user.m_id,
                                                email: new_email,
                                        }, function(response) {
                                                if(response.error) return Blip.error(response.error);
                                                $(root).find('.user_info_card-info').html(
                                                        '<div style="display:inline-block; width:50;">'
                                                                +'&nbsp;'
                                                        +'</div>'
                                                        +'<div style="display:inline-block;">'
                                                                +'<img id="user_photo" class="user_info_card-badges-icon" style="height:100px; margin:0 auto"src="'+thmb_url+'"/>'
                                                        +'</div>'
                                                        +'<div style="display:inline-block; width:50;">'
                                                                +'&nbsp;'
                                                                +'&nbsp;'
                                                        +'</div>'
                                                        +'<div style="display:inline-block;">'
                                                                +'<div class="user_info_card-info-item" data-type="phone">'+Format.phone(user.phone)+'</div>'
                                                                +'<div class="user_info_card-info-item" date-type="email">'+new_email+'</div>'
                                                                +'<div class="user_info_card-info-item" date-type="date_expires">'+'Joined: ' + joinDate+'</div>'
                                                                +'<div class="user_info_card-info-item" date-type="date_expires">'+'Expires: ' + expDate+'</div>'
                                                                +'<br>'
                                                                +'<br>'
                                                        +'</div>'
                                                );
                                        });
                                };
                        });

			$("#user_photo").click(function(){
                          $(this).css("position", "relative");
                          $(this).css("z-index", "999");
                          //$(this).css("height", "auto");
                          $(this).animate({
                            height: "400px",
                          }, 300 );
                        });

                        $("#user_photo").mouseout(function(){
                          $(this).animate({
                            height: "100px",
                          }, 300 );
                        });

			$(root).find('.user_info_card-button')
				.html(
					'<button class="user_info_card-button-staff '+(staff_class)+'">'
					+'</button>'
				).find('.user_info_card-button-staff')
					.click(function() {
						// disable the button
						$(this).attr('disabled', true);
						var button = this;

						switch(user.type) {
							case 'member':
								DATA.action('staff/promote', {
									m_id: user.m_id,
								}, function(response) {
									if(response.error) return Blip.error(response.error);
									user = response;
									$(button).removeClass('member')
										.addClass('staff');
									console.log(userUpdate);
								});
								break;
						}
					})
		};

		var loadRfid = function(json) {
			var elmt = $('<span class="user_info_card-badges-icon">'
					+'<img src="resource/wristband.png">'
				+'</span>');
			if(!json.length) {
				$(elmt).addClass('missing');
				$(elmt).click(function() {
					new FloatBox({
						build: function(close) {
							$(this).html(
								'<div class="title">'
									+'Scan a new wristband now'
								+'</div>'
								+'<div class="body centered">'
									+'((( Scan )))'
								+'</div>');
							new RfidScanner(function(rfid) {
								DATA.action('wristband/new', {
									rfid: rfid,
									m_id: m_id,
								}, function(json) {
									if(json.error) {
										Blip.error(json.error);
									}
									else {
										Blip.good('Wristband now activated for this member');
										close();
									}
								});
							});
						},
						close: function() {
							RfidScanner.unbind();
						},
					});
				});
			}
			else {
				$(elmt).click(function() {
					DB.get('price@(item=?)', 'replace_wristband')
					.ready(function(costResults) {
						var cost = costResults[0].amount;

						new FloatBox({
							build: function(close) {
								$(this).html(
									'<div class="title">'
										+'Confirmation required'
									+'</div>'
									+'<div class="body">'
										+'<p>Please pay $'+cost+' for a replacement wristband.</p>'
										+'<button class="payed good">OK - $'+cost+'.00 payed</button>'
										+'<button class="cancel bad">cancel</button>'
										+'<br><br>'
										+'<button class="delete green">recycle this wristband...</button>'
									+'</div>')

								// cancel button is pressed
								$(this).find('button.cancel').click(close);

								// remove rfid of user
								$(this).find('button.delete').click(function() {
									new FloatBox({
										build: function(close) {
											$(this).html(
												'<div class="title">'
													+'Are you sure you want to remove any and all wristbands for this member?'
												+'</div>'
												+'<div class="body">'
													+'<button class="confirm good">Yes - do it</button>'
													+'<button class="cancel bad">cancel</button>'
												+'</div>');

											// click cancel
											$(this).find('.cancel').click(close);

											// click confirm
											$(this).find('.confirm').click(function() {
												DATA.action('wristband/delete', {
													m_id: m_id,
												}, function(json) {
													if(json.error) {
														Blip.error(json.error);
													}
													else {
														Blip.good('Wristband(s) removed for this member');
														close();
													}
												});
											});
										},
									});
								});

								// when the confirmation button is clicked
								$(this).find('button.payed').click(function() {

									// construct the float box for RFID input	
									new FloatBox({
										build: function(close) {
											$(this).html(
												'<div class="title">'
													+'Replace a wristband for this member'
												+'</div>'
												+'<div class="body">'
													+'((( Scan )))'
												+'</div>'
												);
											new RfidScanner(function(rfid) {
												DATA.action('wristband/replace', {
													rfid: rfid,
													m_id: m_id,
												}, function(json) {
													if(json.error) {
														Blip.error(json.error);
													}
													else {
														Blip.good('Wristband replaced for this member');
														close();
													}
												});
											});
										},
										close: function() {
											RfidScanner.unbind();
										},
									});
								});

							},
						});
					});

				});
			}
			$(root).find('.user_info_card-badges').prepend(elmt);
		};
		
		var loadCertification = function(json) {
			if(!json.length) return Blip.error('User is missing certification row');
			certification = json[0];
			for(var e in certification) {
				if(e == 'm_id') continue;
				if(e == 'longboard') continue;
				if(e == 'white_water_kayak') continue;
				if(e == 'climbing_gear') continue;
				$(root).find('.user_info_card-badges').append(
					'<span id="'+e+'" class="user_info_card-badges-icon">'
						+'<img src="resource/certification.'+e+'.png">'
					+'</span>'
				);
				if(certification.stand_up_paddle_board == 0) {
					$('#stand_up_paddle_board').addClass('missing');
				}
				if(certification.ocean_kayak == 0) {
					$('#ocean_kayak').addClass('missing');
				}
			}
			$('#stand_up_paddle_board').click(function() {
				if (certification.stand_up_paddle_board == 0) {
					new FloatBox({
						build: function(close) {
							$(this).html(
								'<div class="title">'
                                                                	+'Scan staff wristband to confirm SUP certification'
                                                                +'</div>'
                                                                +'<div class="body centered">'
                                                                        +'((( Scan )))'
                                                                +'</div>');
							new RfidScanner(function(rfid) {
								DATA.action('member/SUPcert', {
									rfid: rfid,
									m_id: user.m_id,
								}, function(json) {
									if(json.error) {
										Blip.error(json.error);
									}
									else {
										Blip.good('Member has been SUP certified');
										$('#stand_up_paddle_board').removeClass('missing');
										close();
									}
								});
							});
						},
						close: function() {
							RfidScanner.unbind();
						},
					});
				}
				else {
					var m_id=certification.stand_up_paddle_board;
					DB.get('user@(m_id=?)', m_id)
					.ready(function(cert) {
						var certifier = cert[0].fullname;
						new FloatBox({
							build: function(close) {
								$(this).html(
                                                			'<div class="title">'
                                                        			+'Member certified for SUPing'
                                                        		+'</div>'
                                                        		+'<div class="body">'
                                                        			+'<p>Certified by '+certifier+'</p>'
                                                                		+'<button class="delete green">Remove Certification</button>'
                                                        		+'</div>')
								$(this).find('button.delete').click(function() {
									new FloatBox({
                                                				build: function(close) {
                                                        				$(this).html(
                                                                				'<div class="title">'
                                                                        				+'Are you sure you want to remove SUP certification?'
                                                                				+'</div>'
                                                                				+'<div class="body">'
                                                                        				+'<button class="confirm good">Yes - do it</button>'
                                                                        				+'<button class="cancel bad">cancel</button>'
                                                                				+'</div>');
											// click cancel
                                                        				$(this).find('.cancel').click(close);
                                                        				// click confirm
											$(this).find('.confirm').click(function() {
												DATA.action('member/SUPcertDelete', {
													m_id: user.m_id,
												}, function(json) {
													if(json.error) {
														Blip.error(json.error);
													}
													else {
														Blip.good('SUP certification removed for this member');
														$('#stand_up_paddle_board').addClass('missing');
														close();
													}
												});
											});
                                                				}
                                        				});
								});
							},
						});
					});
				}
			});
			$('#ocean_kayak').click(function() {
                                if (certification.ocean_kayak == 0) {
                                        new FloatBox({
                                                build: function(close) {
                                                        $(this).html(
                                                                '<div class="title">'
                                                                        +'Scan staff wristband to confirm Kayak certification'
                                                                +'</div>'
                                                                +'<div class="body centered">'
                                                                        +'((( Scan )))'
                                                                +'</div>');
                                                        new RfidScanner(function(rfid) {
                                                                DATA.action('member/Kayakcert', {
                                                                        rfid: rfid,
                                                                        m_id: user.m_id,
                                                                }, function(json) {
                                                                        if(json.error) {
                                                                                Blip.error(json.error);
                                                                        }
                                                                        else {
                                                                                Blip.good('Member has been Kayak certified');
                                                                                $('#ocean_kayak').removeClass('missing');
                                                                                close();
                                                                        }
                                                                });
                                                        });
                                                },
                                                close: function() {
                                                        RfidScanner.unbind();
                                                },
                                        });
                                }
				else {
                                        var m_id=certification.ocean_kayak;
                                        DB.get('user@(m_id=?)', m_id)
                                        .ready(function(cert) {
                                                var certifier = cert[0].fullname;
                                                new FloatBox({
                                                        build: function(close) {
                                                                $(this).html(
                                                                        '<div class="title">'
                                                                                +'Member certified for Kayaking'
                                                                        +'</div>'
                                                                        +'<div class="body">'
                                                                                +'<p>Certified by '+certifier+'</p>'
                                                                                +'<button class="delete green">Remove Certification</button>'
                                                                        +'</div>')
                                                                $(this).find('button.delete').click(function() {
                                                                        new FloatBox({
                                                                                build: function(close) {
                                                                                        $(this).html(
                                                                                                '<div class="title">'
                                                                                                        +'Are you sure you want to remove Kayak certification?'
                                                                                                +'</div>'
                                                                                                +'<div class="body">'
                                                                                                        +'<button class="confirm good">Yes - do it</button>'
                                                                                                        +'<button class="cancel bad">cancel</button>'
                                                                                                +'</div>');
                                                                                        // click cancel
                                                                                        $(this).find('.cancel').click(close);
                                                                                        // click confirm
                                                                                        $(this).find('.confirm').click(function() {
                                                                                                DATA.action('member/KayakcertDelete', {
                                                                                                        m_id: user.m_id,
                                                                                                }, function(json) {
                                                                                                        if(json.error) {
                                                                                                                Blip.error(json.error);
                                                                                                        }
                                                                                                        else {
                                                                                                                Blip.good('Kayak certification removed for this member');
                                                                                                                $('#ocean_kayak').addClass('missing');
                                                                                                                close();
                                                                                                        }
                                                                                                });
                                                                                        });
                                                                                }
                                                                        });
                                                                });
                                                        },
                                                });
                                        });
                                }
			});
		};

		var loadPermission = function(json) {
			// permission = json[0];
		};

		var loadRental = function(rental) {
			// rental = json[0];
		};

		// construct the dom
		(function() {

			var html = ''
					+'<div class="user_info_card-button"></div>'
					+'<div class="user_info_card-title"></div>'
					+'<div class="user_info_card-info"></div>'
					+'<div class="user_info_card-badges"></div>'
					+'<div class="user_info_card-list"></div>'
				;

			$(root)
				.html(html)
				.mousedown(function(e) {
					e.stopPropagation();
				});

		})();


		DB.get('user@(m_id=?)', m_id)
			.ready(loadUserInfo);

		DB.get("rfid@(table='user',t_id=?)", m_id)
			.ready(loadRfid);

		DB.get('certification@(m_id=?)', m_id)
			.ready(loadCertification);

		DB.get('permission@(m_id=?)', m_id)
			.ready(loadPermission);

		DB.get('rental@(m_id=?)', m_id)
			.ready(loadRental);
		
		/**
		* public operator() ();
		**/
		var operator = function() {
			
		};
		
		
		/**
		* public:
		**/
			operator['destroy'] = function() {
				$(root).hide();
			};
		
		$(root).show();
		
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
			if(arguments.length) {
				DOM_ROOT = selectElement(arguments[0]) || DOM_ROOT;
			}
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
			return false;
		};
		
		//
		expose['warn'] = function() {
			var args = castArray.call(arguments);
			args.unshift(__func__+':');
			console.warn.apply(console, args);
		};

		expose['destroy'] = function() {
			$(DOM_ROOT).hide();
		};
		
})(window);
