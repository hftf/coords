var Load = (function() {
	var _Load = {
		/* Independent */
		/* There are currently two static indeterminate checkboxes:
		   one under "Key" and one under "Overlaps" */
		indeterminates: function() {
			var indeterminates = document.getElementsByClassName('ind');
			for (var i in indeterminates)
				indeterminates[i].indeterminate = true;
		},
		unclickables: function() {
			var key_checkboxes = document.getElementsByClassName('noclick');
			function noclick() { return false; }
			for (var i in key_checkboxes)
				key_checkboxes[i].onclick = noclick;
		},
		preferences: function() {
			var prefs_chekboxes = document.querySelectorAll('#prefs input[type="checkbox"]');
			var click_f = function() {
				window.localStorage[this.checked ? 'setItem' : 'removeItem'](this.id, 'true');
				document.body.classList[this.checked ? 'remove' : 'add'](this.id);
			};
			for (var i = 0; i < prefs_chekboxes.length; i ++) {
				var el = prefs_chekboxes[i];
				el.onclick = click_f;
				el.checked = window.localStorage.getItem(el.id) !== null;
				document.body.classList[el.checked ? 'remove' : 'add'](el.id);
			}

			var scale_main_slider = document.getElementById('scale-main-slider'),
				scale_main_value = document.getElementById('scale-main-value'),
				cur_scale = window.localStorage.getItem('scale-main-slider'),
				then_layers = document.querySelector('.then .layers.scale-main');

			scale_main_slider.step = scales.mouse / window.devicePixelRatio;
			if (cur_scale)
				scales.main = +cur_scale;
			scale_main_slider.value = scales.main;
			scale_main_value.innerText = scales.main;

			scale_main_slider.oninput = function() {
				scale_main_value.innerText = this.value;
			};
			scale_main_slider.onchange = function() {
				scales.main = +this.value;
				window.localStorage.setItem('scale-main-slider', scales.main);
				var xywh = scale(scales.main / scales.mouse, to_xywh(bounds));
				then_layers.style.width = xywh[2] + 'px';
				then_layers.style.height = xywh[3] + 'px';

				Load.layers();
				Load.setStateOfContexts();
				Load.grid();
				State.setImage(State.getImage());
				recomposite_main();
			};
		},

		main_handlers: function() {
			var main = document.getElementById('main');
			main_ctx = main.getContext('2d');

			var varia = document.getElementById('varia');
			varia_ctx = varia.getContext('2d');

			var click = document.getElementById('click');
			click_ctx = click.getContext('2d');

			var zoom = document.getElementById('zoom');
			zoom_ctx = zoom.getContext('2d');

			this.setStateOfContexts();

			reset_screenshot = document.getElementById('reset-screenshot');

			main_ctx.clear = click_ctx.clear = varia_ctx.clear = zoom_ctx.clear = function() {
				this.clearRect(0, 0, main.width, main.height);
			};
			zoom_ctx.drawScaledImage = function(img) {
				this.drawImage(img, 0, 0, main.width, main.height);
			};

			var coords_click = document.getElementById('coords-click'),
				coords_click_errors = document.getElementById('coords-click-errors');

			click.onclick = function(e) {
				var r = mouse2coords(e);
				coords_click.className = '';
				coords_click_errors.style.display = 'none';

				State.setCoords(r);
			};
			coords_click.onchange = function(e) {
				var r;
				try {
					r = text2coords(coords_click.value);
					coords_click.className = 'valid';
					coords_click_errors.style.display = 'none';

					State.setCoords(r);
				}
				catch (err) {
					coords_click.className = 'invalid';
					coords_click_errors.style.display = 'block';
					coords_click_errors.innerHTML = err;
				}
			};
		},
		setStateOfContexts: function() {
			main_ctx.fillStyle = 'rgba(119,170,255,0.4)';
			varia_ctx.globalAlpha = 0.4;
			click_ctx.fillStyle = '#222';
			zoom_ctx.webkitImageSmoothingEnabled = false;
			zoom_ctx.mozImageSmoothingEnabled = false;
		},
		key_handlers: function() {
			var deltas = {
				37: [-1,  0],
				38: [ 0, -1],
				39: [ 1,  0],
				40: [ 0,  1],
			};
			document.body.onkeydown = function(e) {
				var key = e.keyCode, scale = 1;

				if (key in deltas) {
					if (e.altKey || e.ctrlKey || e.metaKey)
						return;
					if (e.shiftKey)
						scale = 16;

					var r = State.getCoords();
					if (r.length === 0)
						return;

					try {
						State.setCoords(r.map(function(v, i) {
							return v + scale * deltas[key][i];
						}));
					}
					catch (e) {
					}
					e.preventDefault();
				}
			};
		},

		data: function(f) {
			State.setSplitFromUrl();
			var game = State.parseSplit('game');

			var s = document.createElement('script');
			s.src = 'data/' + game + '/data.js';
			s.onload = f;
			s.onerror = function(e) {
				throw "Invalid game id '" + game + "'";
			};
			document.head.appendChild(s);
		},

		/* Dependent on bounds */
		styles: function() {
			var styleSheet = document.createElement('style'), s, xywh, cls;
			for (s in scales) {
				xywh = scale(scales[s] / scales.mouse, to_xywh(bounds));
				cls = '.scale-' + s;
				styleSheet.innerHTML += cls + ' {\n' +
					'\twidth: ' + xywh[2] + 'px; height: ' + xywh[3] + 'px;\n}\n';
			}
			document.head.appendChild(styleSheet);
		},
		layers: function() {
			var canvasSize = scale(scales.main, to_xywh(bounds));
			var canvases = document.querySelectorAll('.then canvas'), canvas;
			for (var i = 0; i < canvases.length; i ++) {
				canvas = canvases[i];
				canvas.width = canvasSize[2];
				canvas.height = canvasSize[3];
			}
		},
		grid: function() {
			var grid = document.getElementById('grid'),
				grid_ctx = grid.getContext('2d'),
				s = scales.main, fontSize = 11 * (1 + s / 4), left = s, top = fontSize - s / 2,
				d = Math.max(cw, ch) / 4, x;

			grid_ctx.strokeStyle = '#888';
			grid_ctx.lineWidth = 1;
			for (x = d; x <= cw; x += d) {
				grid_ctx.moveTo(s * x + 0.5, 0);
				grid_ctx.lineTo(s * x + 0.5, s * ch);
				grid_ctx.moveTo(0,           s * x + 0.5);
				grid_ctx.lineTo(s * cw,      s * x + 0.5);
			}
			grid_ctx.stroke();

			grid_ctx.font = fontSize + 'px Alto Pro';
			grid_ctx.strokeStyle = '#444';
			grid_ctx.fillStyle = '#eee';
			grid_ctx.lineWidth = 2.25 * 2;

			grid_ctx.strokeText('0',   left,        top);
			grid_ctx.fillText  ('0',   left,        top);
			for (x = d; x <= cw; x += d) {
				grid_ctx.strokeText(x, left,        s * (x - 1));
				grid_ctx.fillText  (x, left,        s * (x - 1));
			}
			grid_ctx.textAlign = 'right';
			for (x = d; x <= cw; x += d) {
				grid_ctx.strokeText(x, s * (x - 1), top);
				grid_ctx.fillText  (x, s * (x - 1), top);
			}
		},

		/* Dependent on coords */
		categories_toc: function() {
			var screens = document.getElementById('screens'),
				toc = document.getElementById('toc'),
				returned;
			for (var category in coords) {
				returned = Draw.category(category);
				screens.appendChild(returned[0]);
				toc.appendChild(returned[1]);
			}
		},
		box_handlers: function() {
			var inputs, i;

			inputs = document.querySelectorAll('.menu-list input');
			function rotateState(e) { State.rotateState(this); }
			for (i in inputs) {
				inputs[i].onclick = rotateState;
			}
			inputs = document.querySelectorAll('.menu-heading input');
			function rotateStates(e) { State.rotateStates(this); }
			for (i in inputs) {
				inputs[i].onclick = rotateStates;
			}

			all_inputs = document.querySelectorAll('.menu-list input');
		},
		example: function () {
			var state = { checked: {}, indeterminate: {} }, i;

			state.image = 'bf';
			state.coords = coords['Battle']['Fight']['Attack 1'].coords.slice(2).join(',');
			for (i = 1; i <= 4; i ++)
				state.checked['bf' + i] = true;
			for (i = 1; i <= 6; i ++)
				state.indeterminate['bq' + i] = true;

			var url = State.getUrl(state);
			document.getElementById('example').href = url;
		},

		all: function() {
			this.data(this.dependent.bind(this));

			this.indeterminates();
			this.unclickables();
			this.preferences();

			this.key_handlers();
		},
		dependent: function() {
			document.getElementById('game-name').innerHTML = game_name;

			cw = bounds[2] - bounds[0] + 1;
			ch = bounds[3] - bounds[1] + 1;

			this.styles();
			/* Must set canvas dimensions before changing context */
			this.layers();
			this.main_handlers();

			this.lookup = Encode.lookup();
			this.categories_toc();
			this.box_handlers();
			this.example();

			// requires images
			try {
				State.setAllFromUrl();
			}
			catch (e) {
				// TODO display error to user?
				console.error(e);
			}
		},
	};

	return _Load;
})();
