var Draw = (function() {
	var _Draw = {
		_joinIds: function() {
			for (var i = 0, prev = coords; i < arguments.length; i ++)
				arguments[i] = (prev = prev[arguments[i]]).id;

			return Array.prototype.join.call(arguments, '');
		},
		_permalink: function(id, level) {
			return '<span class="permalink">&nbsp;<a href="#' + id + '" title="Permalink to this ' + level + '">#</a></span>';
		},
		category: function(category) {
			var div = document.createElement('div'),
				h = document.createElement('h2'),
				id = coords[category].id;

			h.innerHTML = '<strong>' + category + '</strong> screens';

			div.setAttribute('id', id);
			div.setAttribute('class', 'category');
			div.appendChild(h);

			var li = document.createElement('li'),
				a = document.createElement('a'),
				ul = document.createElement('ul');
			a.setAttribute('href', '#' + id);
			a.appendChild(document.createTextNode(category));
			li.appendChild(a);

			for (var menu in coords[category])
				if (!(menu in ignore_ids)) {
					var returned = this.menu(menu, category)
					div.appendChild(returned[0]);
					ul.appendChild(returned[1]);
				}
			li.appendChild(ul);

			return [div, li];
		},
		menu: function(menu, category) {
			// Heading
			var section = document.createElement('div'),
				div = document.createElement('div'),
				h = document.createElement('h3'),
				div2 = document.createElement('div'),
				menu_id = this._joinIds(category, menu);
			section.setAttribute('id', menu_id);
			section.setAttribute('class', 'menu');
			div.setAttribute('class', 'menu-heading');
			div2.setAttribute('class', 'menu-list');

			var layers = document.createElement('div');
			layers.setAttribute('class', 'layers scale-menu');
			div.appendChild(h);
			div.appendChild(layers);

			section.appendChild(div);
			section.appendChild(div2);
			var checkbox_id = State.getCheckboxId(menu_id),
				permalink = this._permalink(menu_id, 'screen');
			h.insertAdjacentHTML('beforeend', '<label for="' + checkbox_id + '">' + menu + permalink + '</label>');

			var li = document.createElement('li'),
				a = document.createElement('a');
			a.setAttribute('href', '#' + menu_id);
			a.appendChild(document.createTextNode(menu));
			li.appendChild(a);

			if ('premium' in coords[category] || 'premium' in coords[category][menu]) {
				div2.innerHTML = '<p>This screen is <a href="#premium">premium-only</a>.</p>';
			}
			else if ('desc' in coords[category][menu]) {
				var html = '“' + coords[category][menu].desc + '”';
				html += '<p class="contrib-screen"><a href="https://github.com/hftf/coords/issues/41">Contribute this screen</a></p>';
				div2.innerHTML = html;
			}
			else {
				var checkbox = document.createElement('input');
				checkbox.setAttribute('type', 'checkbox');
				checkbox.setAttribute('id', checkbox_id);
				checkbox.setAttribute('data-self', menu);
				checkbox.setAttribute('data-parent', category);
				checkbox.setAttribute('data-state', 'unchecked');
				var p = document.createElement('div');
				p.setAttribute('class', 'toggle');
				p.insertAdjacentHTML('beforeend', '<label for="' + checkbox_id + '">Toggle buttons to </label>');
				p.appendChild(checkbox);
				div.insertBefore(p, h.nextSibling);

				// Reset
				current_color = 0;

				var c = new_canvas();
				var ctx = c.getContext('2d');
				ctx.globalCompositeOperation = 'dest-over';

				var zoom = function(e) {
					State.setImage(menu_id);
				};

				var img = document.createElement('img'),
					src = 'data/' + game + '/screens/' + category + '/' + menu + '.png';
				img.onerror = this.error.bind(div);
				img.setAttribute('id', menu_id + '-image');
				img.setAttribute('src', src);
				layers.onclick = zoom.bind(img);
				layers.appendChild(img);

				layers.appendChild(c);

				var ul = document.createElement('ul');

				for (var rekt in coords[category][menu]) {
					if (rekt in ignore_ids) continue;
					var child_c = this.rekt(rekt, menu, ctx, category);
					ul.appendChild(child_c);
				}

				div2.appendChild(ul);
			}
			return [section, li];
		},
		rekt: function(rekt, menu, menu_ctx, category) {
			// Heading
			var div = document.createElement('li'),
				rekt_id = this._joinIds(category, menu, rekt);
			div.setAttribute('id', rekt_id);
			div.setAttribute('class', 'rekt');

			var checkbox = document.createElement('input');
			var checkbox_id = State.getCheckboxId(rekt_id),
				permalink = this._permalink(rekt_id, 'button');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('id', checkbox_id);
			checkbox.setAttribute('data-self', rekt);
			checkbox.setAttribute('data-parent', menu);
			checkbox.setAttribute('data-grandparent', category);
			checkbox.setAttribute('data-state', 'unchecked');
			div.appendChild(checkbox);

			var color = palette[current_color ++];
			if (current_color >= palette.length)
				current_color = 0;

			var rekt_obj = coords[category][menu][rekt];

			div.insertAdjacentHTML('beforeend',
				'<label for="' + checkbox_id + '">' +
				'<span class="name">' + rekt + permalink + '</span>' +
				'<small style="background: ' + color + ';"><span>' + format_x1y1.apply(null, rekt_obj.coords) + '</span></small>' +
				'</label>');

			div.appendChild(this.refs(this._joinIds(category, menu), rekt_obj.ref));

			menu_ctx.fillStyle = color;
			var xywh = to_xywh(coords[category][menu][rekt].coords);
			menu_ctx.fillRect.apply(menu_ctx, xywh);

			return div;
		},
		refs: (function() {
			function fixme_filter(to) { return to !== '   '; }
			function to2link(to, i, a) {
				var title, link_text, link, index = '';

				if (to in ref_key) {
					title = ref_key[to];
					link_text = to;
					link = index + '<span title="' + title + '" class="ref ' + to + '">' + link_text + '</span>';
				}
				else {
					var path = Load.lookup[to];
					title = path.join(level_delim);
					link_text = path[path.length - 1];
					link = index + '<a title="' + title + '" class="ref" href="#' + to + '">' + link_text + '</a>';
				}

				return link;
			}

			return function(from, tos) {
				var div = document.createElement('div');
				div.setAttribute('class', 'refs');

				if (tos === undefined)
					tos = [];

				if ('string' === typeof tos)
					tos = [tos];

				tos = tos.filter(fixme_filter);

				if (tos.length > 0)
					div.innerHTML = '<span class="triangle">▶</span> ' + tos.map(to2link).join(', ');

				return div;
			};
		})(),
		error: function(e) {
			(e.target || e.srcElement).dataset.missing = true;
			this.insertAdjacentHTML('beforeend',
				'<p class="contrib-image"><a href="https://github.com/hftf/coords/issues/42">Contribute this screen</a></p>'
			);
		},
	};

	return _Draw;
})();
