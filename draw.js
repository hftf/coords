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

			for (var menu in coords[category])
				if (menu !== 'id')
					div.appendChild(this.menu(menu, category));

			var a = '<a href="#' + id + '">' + category + '</a>';
			return [div, a];
		},
		menu: function(menu, category) {
			// Heading
			var section = document.createElement('div'),
				div = document.createElement('div'),
				h = document.createElement('h3'),
				div2 = document.createElement('div');
			section.setAttribute('class', 'menu');
			div.setAttribute('class', 'menu-heading');
			div2.setAttribute('class', 'menu-list');

			var layers = document.createElement('div');
			layers.setAttribute('class', 'layers');
			div.appendChild(h);
			div.appendChild(layers);

			section.appendChild(div);
			section.appendChild(div2);
			var checkbox_id = this._joinIds(category, menu),
				permalink = this._permalink(checkbox_id, 'screen');
			h.insertAdjacentHTML('beforeend', '<label for="' + checkbox_id + '">' + menu + permalink + '</label>');

			if ('desc' in coords[category][menu]) {
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
				h.insertBefore(checkbox, h.firstChild);

				// Reset
				current_color = 0;

				var c = new_canvas();
				var ctx = c.getContext('2d');
				ctx.globalCompositeOperation = 'dest-over';

				var zoom = function(e) {
					State.setImage(checkbox_id);
				};

				var img = document.createElement('img'),
					src = 'data/' + game + '/screens/' + category + '/' + menu + '.png';
				img.onerror = this.error.bind(div);
				img.setAttribute('id', checkbox_id + '-image');
				img.setAttribute('src', src);
				layers.onclick = zoom.bind(img);
				layers.appendChild(img);

				layers.appendChild(c);

				var ul = document.createElement('ul');

				for (var rekt in coords[category][menu]) {
					if (rekt !== 'id') {
						var child_c = this.rekt(rekt, menu, ctx, category);
						ul.appendChild(child_c);
					}
				}

				div2.appendChild(ul);
			}
			return section;
		},
		rekt: function(rekt, menu, menu_ctx, category) {
			// Heading
			var div = document.createElement('li');
			div.setAttribute('class', 'rekt');

			var checkbox = document.createElement('input');
			var checkbox_id = this._joinIds(category, menu, rekt),
				permalink = this._permalink(checkbox_id, 'button');
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
					title = path.join(' → ');
					link_text = path[path.length - 1];
					link = index + '<a title="' + title + '" class="ref" href="#' + to + '">' + link_text + '</a>';
				}

				return link;
			}

			return function(from, tos) {
				var div = document.createElement('div');
				div.setAttribute('class', 'refs');

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
