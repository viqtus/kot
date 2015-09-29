var window = window;

var engine = {
	audio: function () {

	},

	canvas: {},

	create: {
		set canvas (json) {
			engine.canvas = engine.window.document.createElement('canvas');

			engine.canvas.context = engine.canvas.getContext('2d');

			engine.canvas.resize = function () {
				engine.canvas.height = engine.window.innerHeight;
				engine.canvas.width = engine.window.innerWidth;
			};

			engine.window.document.body.appendChild (engine.canvas);
		}
	},

	draw: function() {

	},

	event: {
		check: function (event) {
			engine.event[event.type].status = true;
		},

		checker: function () {

		},

		load: {
			status: false
		},

		resize: {
			status: false
		},

		uncheck: function (event) {
			engine.event[event.type].status = false;
		},
	},

	game: {
		create: {
			city: function (json) {
				var city = {};
					city.name = (json.name) ? json.name : engine.random(engine.game.options.city.names);
					city.x = (json.x) ? json.x : Math.floor (engine.canvas.width * Math.random ());
					city.y = (json.y) ? json.y : Math.floor (engine.canvas.height * Math.random ());
				return city;
			},

			set map (json) {
				var map = {};
					map.city = {};
					map.city.number = json.city.number;

				for (var i = 0; i < map.city.number; i++) {
					engine.game.create.city = {};
				};

				engine.game.object.map = map;
			}
		},

		load: function () {
			this.options.difficult = 'easy';

			this.create.map = {
				city: {
					number: this.options.city.number
				}
			};
		},

		object: {
			camp: {
				name: 'Name',
				radius: 1,
				x: 0,
				y: 0
			},

			citizen: {
				age: {
					get current () {
						var current = Math.floor((this.max - this.min) * Math.random() + this.min);
						return current;
					},
					max: 120,
					min: 1
				},

				attack: {
					damage: {
						get current () {
							var current = Math.floor((this.max - this.min) * Math.random() + this.min);
							return current;
						},
						min: 0,
						max: 2
					}
				},

				hp: {
					get current () {
						var current = Math.floor((this.max - this.min) * Math.random() + this.min);
						return current;
					},
					max: 10,
					min: 1
				},

				x: 0,
				y: 0
			},

			city: {
				citizens: 1,
				guardians: 1,
				name: 'Name',
				get population () {
					var population = this.citizens + this.guardians;
					return population;
				},
				radius: 1,
				x: 0,
				y: 0
			},

			map: {}
		},

		objects: [],

		options: {
			city: {
				names: [
					''
				],
				number: 1
			},

			set difficult (string) {
				switch (string) {
					case 'easy':
						this.city.number = 5;
						break;
					case 'hard':
						this.city.number = 10;
						break;
				};
			}
		}
	},

	input: function() {
		engine.window.onload = function (event) {
			engine.event.check (event);
			engine.update ();
			engine.event.uncheck (event);
		};

		engine.window.onresize = function (event) {
			engine.event.check (event);
			engine.update ();
			engine.event.uncheck (event);
		};
	},

	load: function () {
		engine.window = window;

		engine.create.canvas = {};

		engine.game.load();

		window.console.log(engine.game.object.city.population);
	},

	output: function () {
		engine.audio ();
		engine.draw ();
	},

	random: function (json) {
		var random = random[Math.floor (json.length * Math.random ())];
		return random;
	},

	run: function () {
		engine.load ();
		engine.input ();
		engine.output ();
	},

	update: function () {
		if (engine.event.load.status) {
			engine.canvas.resize();
		};

		if (engine.event.resize.status) {
			engine.canvas.resize();
		};
	},

	window: {}
};

engine.run();
