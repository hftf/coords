var Draw = (function() {
	var _Draw = {
		category: function(category) {
			var div = document.createElement('div'),
				h = document.createElement('h2'),
				id = 'category-' + category;

			h.innerHTML = '<strong>' + category + '</strong> screens';

			div.setAttribute('id', id);
			div.setAttribute('class', 'category');
			div.appendChild(h);

			for (menu in coords[category])
				div.appendChild(this.menu(menu, category));

			var a = '<a href="#' + id + '">' + category + '</a>';
			return [div, a];
		},
		menu: function(menu, parent) {
			// Heading
			var section = document.createElement('div'),
				div = document.createElement('div');
				h = document.createElement('h3');
			section.setAttribute('class', 'menu');
			div.setAttribute('class', 'menu-heading');

			var checkbox = document.createElement('input');
			var checkbox_id = parent + menu;
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('id', checkbox_id);
			checkbox.setAttribute('data-id', menu);
			checkbox.setAttribute('data-parent', parent);
			checkbox.setAttribute('data-state', 'unchecked');
			h.appendChild(checkbox);
			h.insertAdjacentHTML('beforeend', '<label for="' + checkbox_id + '">' + menu + '</label>');
			div.appendChild(h);

			// Reset
			current_color = 0;

			var c = new_canvas();
			var ctx = c.getContext('2d');
			ctx.globalCompositeOperation = 'dest-over';

			var layers = document.createElement('div');
			layers.setAttribute('class', 'layers');
			layers.appendChild(c);
			layers.insertAdjacentHTML('afterbegin', '<img src="data/' + game + '/screens/' + parent + '/' + menu + '.png">');
			div.appendChild(layers);
			section.appendChild(div);

			var div2 = document.createElement('div');
			div2.setAttribute('class', 'menu-list');
			var ul = document.createElement('ul');

			for (rekt in coords[category][menu]) {
				var child_c = this.rekt(rekt, menu, ctx, parent);
				ul.appendChild(child_c);
			}

			div2.appendChild(ul);
			section.appendChild(div2);
			return section;
		},
		rekt: function(rekt, parent, parent_ctx, grandparent) {
			// Heading
			var div = document.createElement('li');
			div.setAttribute('class', 'rekt');

			var checkbox = document.createElement('input');
			var checkbox_id = grandparent + parent + rekt;
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('id', checkbox_id);
			checkbox.setAttribute('data-id', rekt);
			checkbox.setAttribute('data-parent', parent);
			checkbox.setAttribute('data-grandparent', grandparent);
			checkbox.setAttribute('data-state', 'unchecked');
			div.appendChild(checkbox);

			var color = palette[current_color ++];
			if (current_color >= palette.length)
				current_color = 0;

			div.insertAdjacentHTML('beforeend',
				'<label for="' + checkbox_id + '">' +
				'<strong>' + rekt + '</strong>' +
				'<small style="background: ' + color + ';"><span>' + format_x1y1.apply(null, coords[category][menu][rekt]) + '</span></small>' +
				'</label>');

			parent_ctx.fillStyle = color;
			var xywh = to_xywh.apply(null, coords[category][menu][rekt]);
			parent_ctx.fillRect.apply(parent_ctx, xywh);

			return div;
		},
	};

	return _Draw;
})();
