$(document).ready(function() {

	FloatBox('.float_box');

	$('#logout').click(function() {
		window.location.href = '/auth/logout';
	});

	$(document).mousedown(function(e) {
		UserInfoCard.destroy();
	});

	DATA.action('admin/info', {}, function(json) {
		$('#who').html(json.staff_name);

		var p = json.permissions;
		var showUser = false;
		if(p.signup_member) {
			new MembershipForm('#user-register');
			$('li>a[href="#user-register"]').parent().show()
			showUser = true;
		}
		if(p.search_user) {
			new UserSearch('#user-management .user_search', p);
			$('li>a[href="#user-management"]').parent().show();
			showUser = true;

			UserInfoCard('.user_info_card');
		}
		if(p.add_gear) {
			new GearManager('div#gear-add_new');
			$('li>a[href="#gear-add_new"]').parent().show()

			$('li>a[href="#gear"]').parent().show()
			$('#gear.panel-tab').tabs();
		}

		new GearRentals('div#gear-rentals');

		if(p.control_services) {
			new ServiceLoader('get/services.json', '#service-controls');
			$('li>a[href="#service"]').parent().show()
		}

		if(showUser) {
			$('li>a[href="#user"]').parent().show()
			$('#user.panel-tab').tabs();
		}
		console.log(p);
		$('#panel-tabs').tabs();
	});

});