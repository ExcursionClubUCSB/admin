exports.json = [

	/*!
	* Automatic Email Sender
	*/
	{
		id: "emails",
		type: "data",
		name: "Automatic Email Sender",
		help: "Settings for all services that send emails out",
		controls: [
			{
				type: "const",
				name: "Email Provider",
				value: "GMAIL",
			},
			{
				type: "text",
				name: "Sender Name",
				help: "The name of the sender as it will appear to recipients in the email",
			},
			{
				type: "text",
				name: "Sender Address",
				help: "An existing gmail address to send the emails through",
			},
			{
				type: "text",
				name: "Sender Password",
				help: "The password to the sender's email address so this service can send out emails",
			}
		],
	},

	/*!
	* Gear Checkout Reminder
	*/
	{
		id: "rentals",
		type: "service",
		name: "Gear Checkout Reminder",
		help: "Automatically sends out emails to remind members when gear is overdue.",
		controls: [
			{
				type: "block",
				name: "Reminder Email",
				help: "This email is to remind the user that gear is due back soon.",
				controls: [
					{
						type: "hours",
						name: "Advanced Reminder",
						help: "If gear is due back within this many hours from now, then send a reminder email",
					},
					{	
						type: "time of day",
						name: "Delivery Time",
						help: "Time of day to send out reminder email",
					},
					{
						type: "text",
						name: "Email Subject",
						help: "Subject line of the email",
					},
					{
						type: "code",
						name: "Email Body",
						help: "Body text of the email",
					},
				],
			}
		],
	},

	{
		id: "welcome-email",
		name: "Welcome Email Sender",
	},

	{
		id: "shed-lock",
		type: "daemon",
		name: "Shed Lock",
		controls: [
			{
				type: "button",
				name: "(Re)start shed lock",
				action: {
					type: "ajax",
					obj: {
						url: "http://192.168.1.125:5471/rfid/bind/0",
						type: "POST",
						data: {
							purpose: "lock",
							options: '{"deviceName":"Shed B Lock"}',
						},
					},
				},
			}
		],
	},
];