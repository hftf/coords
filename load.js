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

			var coords_hover = document.getElementById('coords-hover');
			main.onmousemove = function(e) {
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

			main.onclick = function(e) {
				list_overlaps(mouse2coords(e));
				coords_click.className = '';
				coords_click_errors.style.display = 'none';
			};
			coords_click.onchange = function(e) {
				try {
					list_overlaps(text2coords(coords_click.value));
					coords_click.className = 'valid';
					coords_click_errors.style.display = 'none';
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

			this.grid();
			this.main_handlers();

			this.categories_toc();
		}
	};

	return _Load;
})();
