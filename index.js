var window = window;

var game = {
	canvas: {
		autosize: function () {
			game.canvas.height = window.innerHeight;
			game.canvas.width = window.innerWidth;

			for (var id in game.canvas) {
				if ((id != 'autosize') && (id != 'height') && (id != 'length') && (id != 'width')) {
					game.canvas[id].height = game.canvas.height;
					game.canvas[id].width = game.canvas.width;
				};
			};
		},

		get length () {
			var length = 0;

			for (var id in game.canvas) {
				if ((id != 'autosize') && (id != 'height') && (id != 'length') && (id != 'width')) {
					length++;
				};
			};

			return length;
		}
	},

	create: {
		canvas: function (id, layer) {
				var canvas = window.document.createElement ('canvas');
						canvas.context = canvas.getContext ('2d');
						canvas.id = (id) ? id : game.canvas.length;
						canvas.style.zIndex = (layer) ? layer : game.canvas.length;

				game.canvas[canvas.id] = canvas;

				game.canvas.autosize ();

				window.document.body.appendChild (canvas);
		}
	},

	event: {
		load: function () {

		},

		mousedown: function () {
			window.console.log ('md');
		},

		resize: function () {
			game.canvas.autosize ();
		}
	},

	load: function () {
		game.create.canvas ();

		window.onmousedown = game.event.mousedown;
		window.onload = game.event.load;
		window.onresize = game.event.resize;
	},

	run: function () {
		game.load ();
	}
};

game.run ();
