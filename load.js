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
			for (var i in key_checkboxes)
				key_checkboxes[i].onclick = function() { return false; };
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

			for (i = 1; i <= 4; i ++)
				state.checked['bf' + i] = true;
			for (i = 1; i <= 6; i ++)
				state.indeterminate['bq' + i] = true;

			var url = State.getUrl(state);
			document.getElementById('example').href = url;
		},

		grid: function() {
			var grid = document.getElementById('grid');
			var grid_ctx = grid.getContext('2d');
			grid_ctx.strokeStyle = grid_ctx.fillStyle = '#888';
			grid_ctx.lineWidth = 1;
			grid_ctx.font = '22px Alto Pro';
			for (var x = 64; x <= cw; x += 64) {
				grid_ctx.textAlign = 'right';
				grid_ctx.moveTo     (4*x+0.5, 0);
				grid_ctx.lineTo     (4*x+0.5, ch*4);
				grid_ctx.fillText(x, 4*x-4,   20);
				grid_ctx.textAlign = 'left';
				grid_ctx.moveTo     (0,       4*x+0.5);
				grid_ctx.lineTo     (cw*4,    4*x+0.5);
				grid_ctx.fillText(x, 4,      4*x-4);
			}
			grid_ctx.fillText(0, 4, 20);
			grid_ctx.stroke();
		},
		main_handlers: function() {
			var main = document.getElementById('main');
			main_ctx = main.getContext('2d');
			main_ctx.scale(2, 2);
			main_ctx.fillStyle = '#7af';

			var click = document.getElementById('click');
			click_ctx = click.getContext('2d');
			click_ctx.fillStyle = '#222';
			click_ctx.scale(2, 2);
			click_ctx.clear = function() {
				this.clearRect.apply(this, to_xywh.apply(null, bounds));
			};

			var coords_hover = document.getElementById('coords-hover');
			click.onmousemove = function(e) {
				var s = '';
				var r = mouse2coords(e);

				if (r.x >= 0 && r.y >= 0) {
					var d = main_ctx.getImageData(~~r.x, ~~r.y, 1, 1).data;
					coords_hover.innerHTML = r.fx + ',' + r.fy;
					coords_hover.style.backgroundColor = 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
				}

			};
			var coords_click = document.getElementById('coords-click'),
				coords_click_errors = document.getElementById('coords-click-errors');

			click.onclick = function(e) {
				var r = mouse2coords(e);
				list_overlaps(r);
				coords_click.className = '';
				coords_click_errors.style.display = 'none';

				State.setCoords([r.fx, r.fy]);
				State.replaceState();
			};
			coords_click.onchange = function(e) {
				var r;
				try {
					r = text2coords(coords_click.value);
					list_overlaps(r);
					coords_click.className = 'valid';
					coords_click_errors.style.display = 'none';

					State.setCoords([r.fx, r.fy]);
					State.replaceState();
				}
				catch (err) {
					coords_click.className = 'invalid';
					coords_click_errors.style.display = 'block';
					coords_click_errors.innerHTML = err;
				}
			};
		},

		categories_toc: function() {
			var b = document.getElementById('b'),
				toc = document.getElementById('toc'),
				jumps = [], returned;
			for (category in coords) {
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

			this.grid();
			this.main_handlers();

			this.categories_toc();
		}
	};

	return _Load;
})();
