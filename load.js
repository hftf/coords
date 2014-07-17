var Load = (function() {
	var _Load = {
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
			var prefs_chekboxes = document.querySelectorAll('#prefs input');
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

		styles: function() {
			var largeSize = scale(mouse_scale, to_xywh(bounds)),
				smallSize = scale(menu_scale, to_xywh(bounds)),
				styleSheet = document.createElement('style');
			styleSheet.innerHTML = '.size-large{'
				+ 'width:'  + largeSize[2] + 'px;'
				+ 'height:' + largeSize[3] + 'px;'
			+ '}'
			+ '.size-small{'
				+ 'width:'  + smallSize[2] + 'px;'
				+ 'height:' + smallSize[3] + 'px;'
			+ '}';
			document.head.appendChild(styleSheet);
		},
		layers: function() {
			var canvasSize = scale(main_scale, to_xywh(bounds));
			var canvases = document.querySelectorAll('.then canvas'), canvas;
			for (var i = 0; i < canvases.length; i ++) {
				canvas = canvases[i];
				canvas.width = canvasSize[2];
				canvas.height = canvasSize[3];
			}
		},
		grid: function() {
			var grid = document.getElementById('grid');
			var grid_ctx = grid.getContext('2d');
			grid_ctx.strokeStyle = grid_ctx.fillStyle = '#888';
			grid_ctx.lineWidth = 1;

			var fontSize = 22, left = main_scale, top = fontSize - main_scale / 2;
			grid_ctx.font = fontSize + 'px Alto Pro';

			for (var x = 64; x <= cw; x += 64) {
				grid_ctx.textAlign = 'right';
				grid_ctx.fillText(x, main_scale * (x - 1), top);
				grid_ctx.moveTo     (main_scale * x + 0.5, 0);
				grid_ctx.lineTo     (main_scale * x + 0.5, main_scale * ch);

				grid_ctx.textAlign = 'left';
				grid_ctx.fillText(x, left,                 main_scale * (x - 1));
				grid_ctx.moveTo     (0,                    main_scale * x + 0.5);
				grid_ctx.lineTo     (main_scale * cw,      main_scale * x + 0.5);
			}
			grid_ctx.fillText  ('0', left,                 top);
			grid_ctx.stroke();
		},
		main_handlers: function() {
			var main = document.getElementById('main');
			main_ctx = main.getContext('2d');
			main_ctx.fillStyle = '#7af';

			var varia = document.getElementById('varia');
			varia_ctx = varia.getContext('2d');

			var click = document.getElementById('click');
			click_ctx = click.getContext('2d');
			click_ctx.fillStyle = '#222';

			var zoom = document.getElementById('zoom');
			zoom_ctx = zoom.getContext('2d');
			zoom_ctx.webkitImageSmoothingEnabled = false;
			zoom_ctx.mozImageSmoothingEnabled = false;

			reset_screenshot = document.getElementById('reset-screenshot');

			main_ctx.clear = click_ctx.clear = varia_ctx.clear = zoom_ctx.clear = function() {
				this.clearRect(0, 0, main.width, main.height);
			};
			zoom_ctx.drawScaledImage = function(img) {
				this.drawImage(img, 0, 0, main.width, main.height);
			};

			var coords_hover = document.getElementById('coords-hover');
			click.onmousemove = function(e) {
				var s = '';
				var r = mouse2coords(e);

				if (r[0] >= 0 && r[1] >= 0) {
					var p = coords2main(r);
					var d = main_ctx.getImageData(p[0], p[1], 1, 1).data;
					coords_hover.innerHTML = r[0] + ',' + r[1];
					coords_hover.style.backgroundColor = 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
				}

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

		_lookup: (function() {
			var lookup, max_depth = 3, cur;
			function get(obj, key) {
				return obj[key];
			}
			function recurse(me) {
				if (cur.length === max_depth)
					return;
				if (me === 'id' || me ==='desc')
					return;
				if (me) {
					cur.push(me);

					var key = Draw._joinIds.apply(null, cur);
					if (key in lookup)
						throw "Key '" + key + "' not unique";
					lookup[key] = cur.slice(0);
				}

				Object.keys(cur.reduce(get, coords)).map(recurse);
				cur.pop();
			}

			return function() {
				lookup = {}, cur = [];
				recurse();
				return lookup;
			};
		})(),

		categories_toc: function() {
			var b = document.getElementById('b'),
				toc = document.getElementById('toc'),
				jumps = [], returned;
			for (var category in coords) {
				returned = Draw.category(category);
				b.appendChild(returned[0]);
				jumps.push(returned[1]);
			}
			toc.insertAdjacentHTML('beforeend', jumps.join(' · '));
		},

		all: function() {
			this.indeterminates();
			this.unclickables();
			this.preferences();
			this.example();
			this.styles();
			this.layers();

			this.main_handlers();
			this.key_handlers();

			this.lookup = this._lookup();
			this.categories_toc();
		}
	};

	return _Load;
})();
