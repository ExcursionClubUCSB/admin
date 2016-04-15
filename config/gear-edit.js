exports.json = {
	
	/* Backpacking */
	Backpacking: [
		// Backpacks
		{
			name: 'Backpack',
			show: '$sizeL $make $model Backpack',
			fill: {
				category: 'backpack',
				department: 'backpacking/camping',
			},
			specs: {
				model: 'str',
				'size (# liters)': 'int[L]',
			},
		},
		
		// Backpacking Tent
		{
			name: 'Backpacking Tent',
			show: '$size person $make $model Backpacking Tent',
			help: 'Ultra-Lightweight sleeping bags only for backpacking trips',
			fill: {
				category: 'backpacking tent',
				department: 'backpacking',
			},
			specs: {
				model: 'str',
				'size (# people)': 'int[ person]',
			},
		},
		
		// Backpacking Sleeping Bag
		{
			name: 'Backpacking Sleeping Bag',
			show: '$temperature ˚F $make $model Backpacking Sleeping Bag',
			fill: {
				category: 'backpacking sleeping bag',
				department: 'backpacking',
			},
			specs: {
				model: 'str',
				'temperature rating (degrees F)': 'int[*F]',
			},
		},
		
		// Backpacking Sleeping Bag Liners
		{
			name: 'Sleeping Bag Liner',
			show: '$make $model Sleeping Bag Liner',
			fill: {
				category: 'backpacking sleeping bag liner',
				department: 'backpacking',
			},
			specs: {
				model: 'str',
			},
		},
		
		// Water Filters
		{
			name: 'Water Filter',
			show: '$make $mechanism Water Filter',
			fill: {
				category: 'water filter',
				department: 'backpacking',
			},
			specs: {
				mechanism: 'hand pump/ultraviolet/gravity',
				description: '?str',
			},
		},
		
		// First Aid Kit
		{
			name: 'First Aid Kit',
			show: '$size First Aid Kit',
			fill: {
				category: 'first aid kit',
				department: 'backpacking/camping',
			},
			specs: {
				size: 'small/medium/large',
			},
		},
		
		// Backpacking Lantern
		{
			name: 'Backpacking Lantern',
			show: '$make $powered-powered Backpacking Lantern',
			help: 'For compact backpacking lanterns only',
			optional: ['rfid'],
			fill: {
				category: 'backpacking lantern',
				department: 'backpacking',
			},
			specs: {
				model: 'str',
				powered: 'battery',
			},
		},

		// Backpacking Stove
		{
			name: 'Backpacking Stove',
			show: '$make $type Backpacking Stove',
			optional: ['rfid'],
			fill: {
				category: 'stove',
				department: 'backpacking',
			},
			specs: {
				type: 'butane direct canister<screws onto gas canister>'
					+'/pressurized liquid fuel<burner separate from gas bottle>'
					+'/proprietary-integrated canister<eg: jet boil>',
			},
		},
		
	],
		
	
	/* Camping */
	Camping: [
		
		// Camping Tent
		{
			name: 'Camping Tent',
			show: '$size person $make $model Camping Tent',
			fill: {
				category: 'camping tent',
				department: 'camping',
			},
			specs: {
				model: 'str',
				'size (# people)': 'int[ person]',
			},
		},
		
		// Camping Sleeping Bag
		{
			name: 'Camping Sleeping Bag',
			show: '$temperature ˚F $make Camping Sleeping Bag',
			fill: {
				category: 'camping sleeping bag',
				department: 'camping',
			},
			specs: {
				'temperature rating (degrees F)': 'int[*F]',
			},
		},
		
		// Sleeping Pad
		{
			name: 'Sleeping Pad',
			show: '$type Sleeping Pad',
			distinguish: '$color $type',
			optional: ['rfid'],
			fill: {
				category: 'sleeping pad',
				department: 'backpacking/camping',
			},
			specs: {
				color: 'str',
				type: 'inflatable/thermarest foam/insolating foam',
			},
		},
		
		// Stoves
		{
			name: 'Camping Stove',
			show: '$make $type Camping Stove',
			distinguish: 'type',
			optional: ['rfid'],
			fill: {
				category: 'camping stove',
				department: 'camping',
			},
			specs: {
				type: 'propane single burner<with stove top grill + gas valve>'
					+'/propane double burner<with stove top grill + gas valve>',
			},
		},
		
		// Lanterns
		{
			name: 'Camping Lantern',
			show: '$powered-powered Camping Lantern',
			distinguish: 'type',
			optional: ['rfid'],
			help: 'For large lanterns only. See Backpacking Lanterns for compact size',
			fill: {
				category: 'camping lantern',
				department: 'camping',
			},
			specs: {
				powered: 'battery/propane',
			},
		},
		
		// Table
		{
			name: 'Table',
			show: 'Camping Table',
			optional: ['rfid'],
			fill: {
				category: 'camping table',
				department: 'camping',
			},
		},
		
		// Chair
		{
			name: 'Chair',
			show: 'Camping Chair',
			optional: ['rfid'],
			fill: {
				category: 'camping chair',
				department: 'camping',
			},
		},
		
		// Cooler
		{
			name: 'Cooler',
			show: 'Camping Cooler ($detail. $wheels wheels)',
			optional: ['rfid'],
			fill: {
				category: 'cooler',
				department: 'camping',
			},
			specs: {
				wheels: 'yes/no',
				detail: 'str',
			},
		},
		
		// Tarp
		{
			name: 'Tarp',
			show: '$dimensions $color Tarp',
			optional: ['rfid'],
			fill: {
				category: 'tarp',
				department: 'camping',
			},
			specs: {
				color: 'str',
				dimensions: 'str',
			},
		},
		
		// Water Jug
		{
			name: 'Water Jug',
			show: '$gallons gallon Water Jug',
			distinguish: '$gallons gallon',
			optional: ['rfid'],
			fill: {
				category: 'water jug',
				department: 'camping',
			},
			specs: {
				gallons: 'int[ gallon]',
			},
		},
		
		// Shovel
		{
			name: 'Shovel',
			show: 'Camping Shovel',
			// distinguish: '',
			optional: ['rfid','make'],
			fill: {
				category: 'camping shovel',
				department: 'camping',
			},
		},
		
		// Cooking Gear
		{
			name: 'Cooking Gear',
			show: 'Cooking Utensil ($type. $description)',
			optional: ['rfid'],
			fill: {
				category: 'cooking utensil',
				department: 'camping',
			},
			specs: {
				type: 'pot/pan/big fork/knife/dish spoon/other',
				description: '?str',
			},
		},
	],
		
	/* Climbing */
	Climbing: [
		// Climbing Harness
		{
			name: 'Climbing Harness',
			show: '$size Climbing Harness',
			fill: {
				category: 'climbing harness',
				department: 'climbing',
			},
			specs: {
				size: 'xs/small/med/large/xl',
			},
		},
		
		// Climbing Shoes
		{
			name: 'Climbing Shoes',
			show: 'Size $men [US Men\'s] $make Climbing Shoes',
			fill: {
				category: 'climbing shoes',
				department: 'climbing',
			},
			specs: {
				'men us size': 'num(5,13,0.5)[US]',
				'women us size': '?num(4,13,0.5)[US-W]',
				'euro size': '?num(20,60,0.5)[cm]',
			},
		},
		
		// Climbing Rope
		{
			name: 'Climbing Rope',
			show: '$length.0m $make Climbing Rope',
			help: 'For dynamic climbing ropes only',
			fill: {
				category: 'climbing rope',
				department: 'climbing',
			},
			specs: {
				length: 'int[m]',
			},
		},

		// Static Rope
		{
			name: 'Static Rope',
			show: '$length.0m Static Rope (NOT FOR CLIMBING)',
			help: 'For static ropes only',
			fill: {
				category: 'static rope',
				department: 'canyoneering',
			},
			specs: {
				length: 'int[m]',
			},
		},
		
		// Carabiner
		{
			name: 'Carabiner',
			show: '$rating kN $type Carabiner',
			optional: ['rfid'],
			fill: {
				category: 'carabiner',
				department: 'climbing',
			},
			specs: {
				'type': 'symmetric/screw-gate/auto-locking',
				'rating (strongest)': 'int[kN]',
			},
		},
		
		// ATC + Carabiner
		{
			name: 'ATC + Carabiner (Combo)',
			distinguish: '$color tape',
			show: 'ATC + $rating kN $type Carabiner',
			optional: ['rfid'],
			fill: {
				category: 'atc & carabiner',
				department: 'climbing',
			},
			specs: {
				'color tape': 'str',
				'type of carabiner': 'symmetric/screw-gate/auto-locking',
				'rating (strongest)': 'int[kN]',
			},
		},
		
		// Quickdraw Set
		{
			name: 'Quickdraw Set',
			show: 'Quickdraw Set',
			optional: ['rfid'],
			fill: {
				category: 'quickdraw set',
				department: 'climbing',
			},
		},

		// Slings
		{
			name: 'Sling',
			show: 'Climbing Sling',
			optional: ['rfid'],
			fill: {
				category: 'climbing sling',
				department: 'climbing',
			},
		},

		// Helmets
		{
			name: 'Helmet',
			show: 'Helmet',
			fill: {
				category: 'helmet',
				department: 'climbing/canyoneering',
			},
		},
	],

	// Surfing
	Surfing: [
		// Wetsuit
		{
			name: 'Wetsuit',
			show: '$make $gender Size $size Wetsuit',
			optional: ['rfid'],
			fill: {
				category: 'wetsuit',
				department: 'surfing',
			},
			specs: {
				gender: "Men's/Women's/Unisex",
				size: 'int',
				description: '?str',
			},
		},

		// Surfboard
		{
			name: 'Surfboard',
			show: '$length $type',
			optional: ['rfid','make'],
			fill: {
				category: 'surfboard',
				department: 'surfing',
			},
			specs: {
				length: 'str',
				type: 'shortboard/fish/funboard/foam-top/longboard',
			},
		},

	],

	// Diving
	Diving: [
		// Mask Snorkel + Fins
		{
			name: 'Mask, Snorkel + Fins',
			show: '$mask_color Dive Mask w/ Snorkel + $fins_color Fins',
			optional: ['rfid'],
			fill: {
				category: 'mask snorkel fins',
				manufacturer: 'Excursion',
				department: 'diving',
			},
			specs: {
				mask_color: 'str',
				fins_color: 'str',
			},
		},
	],

	// Water Sports
	'Water Sports': [
		// SUP
		{
			name: 'SUP',
			show: '$make $length SUP',
			optional: ['rfid'],
			fill: {
				category: 'sup board',
				department: 'suping',
			},
			specs: {
				length: 'str',
			},
		},

		// SUP Paddle
		{
			name: 'SUP Paddle',
			show: '$length SUP Paddle',
			optional: ['rfid'],
			fill: {
				category: 'sup paddle',
				department: 'suping',
			},
			specs: {
				length: 'str',
			},
		},

		// Kayak
		{
			name: 'Kayak',
			show: '$type Kayak',
			optional: ['rfid'],
			fill: {
				category: 'kayak',
				department: 'kayaking',
			},
			specs: {
				type: 'single ocean/double ocean/surf ocean/white water',
			},
		},

		// Body Board
		{
			name: 'Body Board',
			show: '$description Body Board',
			optional: ['rfid'],
			fill: {
				category: 'body board',
				department: 'surfing',
			},
			specs: {
				description: 'str',
			},
		},

		// Skim Board
		{
			name: 'Skim Board',
			show: '$description Skim Board',
			optional: ['rfid'],
			fill: {
				category: 'body board',
				department: 'surfing',
			},
			specs: {
				description: 'str',
			},
		},
	],
	
	// Paintballing
	Paintballing: [
		// Paintball Gun
		{
			name: 'Paintball Gun',
			show: '$make $model Paintball Gun',
			optional: ['rfid'],
			fill: {
				category: 'paintball gun',
				department: 'paintballing',
			},
			specs: {
				model: 'str',
			},
		},
		
		// CO2 Tank
		{
			name: 'CO2 Tank',
			show: '$capacityOz CO2 Tank',
			optional: ['rfid'],
			fill: {
				category: 'co2 tank',
				department: 'paintballing',
			},
			specs: {
				capacity: 'int[oz]',
			},
		},
		
		// Mask
		{
			name: 'Mask',
			optional: ['rfid'],
			fill: {
				category: 'paintball mask',
			},
		},
	],

	// Mountaineering
	Mountaineering: [
		// Snow Shoes
		{
			name: 'Snow Shoes',
			show: '$make Snow Shoes',
			optional: ['rfid'],
			fill: {
				category: 'snow shoes',
				department: 'mountaineering',
			},
			specs: {
				description: 'str',
			},
		},

		// Crampons
		{
			name: 'Crampons',
			show: 'Crampons',
			optional: ['rfid'],
			fill: {
				category: 'crampons',
				department: 'mountaineering',
			},
			specs: {
				description: 'str',
			},
		},

		// Ice Axes
		{
			name: 'Ice Axe',
			show: 'Ice Axe',
			optional: ['rfid'],
			fill: {
				category: 'ice axe',
				department: 'mountaineering',
			},
			specs: {
				description: 'str',
			},
		},
	],

	// Snow Sports
	'Snow Sports': [
		// Skis
		{
			name: 'Skis',
			show: '$make $length $type Skis',
			optional: ['rfid'],
			fill: {
				category: 'skis',
				department: 'skiing snowboarding',
			},
			specs: {
				length: 'str',
				'type': 'downhill/cross-country',
				'binding type': 'demo adjustable/adjustable',
			},
		},

		// Ski Boots
		{
			name: 'Ski Boots',
			show: '$description Ski Boots',
			optional: ['rfid'],
			fill: {
				category: 'ski boots',
				department: 'skiing snowboarding',
			},
			specs: {
				'men us szie': 'num(5,14,0.5)[US]',
				description: '?str',
			},
		},

		// Ski Poles
		{
			name: 'Ski Poles',
			show: '$description Ski Poles',
			optional: ['rfid'],
			fill: {
				category: 'ski poles',
				department: 'skiing snowboarding',
			},
			specs: {
				length: 'str',
				description: 'str',
			},
		},

		// Snowboard
		{
			name: 'Snowboard',
			show: '$make $length cm Snowboard',
			optional: ['rfid'],
			fill: {
				category: 'snowboards',
				department: 'skiing snowboarding',
			},
			specs: {
				length: 'int[cm]',
				description: '?str',
			},
		},

		// Snowboard Boots
		{
			name: 'Snowboard Boots',
			show: 'Size $men [US Men\'s] Snowboard Boots',
			optional: ['rfid'],
			fill: {
				category: 'snowboard boots',
				department: 'skiing snowboarding',
			},
			specs: {
				'men US size': 'num(5,14,0.5)[US]',
				description: '?str',
			},
		},

		// Tire Chains
		{
			name: 'Tire Chains',
			show: '$type Tire Chains',
			optional: ['rfid'],
			fill: {
				category: 'tire chains',
				department: 'skiing snowboarding',
			},
			specs: {
				type: 'sedan/suv',
			},
		},

	],

	// Fishing
	Fishing: [
		// Fishing Pole
		{
			name: 'Fishing Pole',
			show: 'Fishing Pole',
			optional: ['rfid'],
			fill: {
				category: 'fishing pole',
				department: 'fishing',
			},
			specs: {
				description: 'str',
			},
		},

		// Fishing Reel
		{
			name: 'Fishing Reel',
			show: 'Fishing Reel',
			optional: ['rfid'],
			fill: {
				category: 'fishing reel',
				department: 'fishing',
			},
			specs: {
				description: 'str',
			},
		},
	],

	/* Miscellaneous */
	// Other
	Other: [
		{
			name: 'Other',
			fill: {},
			specs: {
				description: 'str',
			},
		},
	],
	
};