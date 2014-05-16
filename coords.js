var palette = [
	'rgb(200, 42,102)', 'rgb(232,157, 52)', 'rgb(206, 98,195)', 'rgb(178,223, 75)', 'rgb( 97,223,181)', 'rgb(255,135, 83)', 'rgb(255,255,111)',
	'rgb(223, 38, 65)', 'rgb(185,202,246)', 'rgb(217,142,  0)', 'rgb(255,255,  1)', 'rgb( 70,138,126)', 'rgb(255,189,211)', 'rgb(161, 38,148)',
	'rgb( 88,150, 62)', 'rgb(237,185, 52)', 'rgb( 85, 78,148)', 'rgb(255,198,187)', 'rgb(128,128,  0)', 'rgb(128 , 0, 64)', 'rgb(255,255,195)'
];

var b, current_color, all_inputs, main_ctx,
	cw = bounds[2] - bounds[0] + 1;
	ch = bounds[3] - bounds[1] + 1;

function new_canvas() {
	var c = document.createElement('canvas');
	c.width  = cw;
	c.height = ch;
	return c;
}

function to_xywh(x1, y1, x2, y2) { return [x1, y1, x2 - x1 + 1, y2 - y1 + 1]; }

var next_state = {
	'unchecked': 'checked',
	'checked': 'indeterminate',
	'indeterminate': 'unchecked',
}
function rotate_state(e) {
	set_state(this, next_state[this.dataset.state]);
}

function example() {
	reset_all();
	for (var i = 1; i <= 4; i ++)
		set_state(document.getElementById('FightAttack ' + i), 'checked');
	for (var i = 1; i <= 6; i ++)
		set_state(document.getElementById('PocketItem ' + i), 'indeterminate');
	return false;
}

var encode = { 'unchecked': 0, 'checked': 1, 'indeterminate': 2 };
var decode = { 0: 'unchecked', 1: 'checked', 2: 'indeterminate' };
function serialize() {
	var x = {};
	var l = document.querySelectorAll('.menu input')
	for (var i = 0; i < l.length; i ++) {
		var v = l[i], u = encode[v.dataset.state];
		if(u !== 0)
			x[v.id] = u;
	}
	return JSON.stringify(x);
}
function unserialize(s) {
	reset_all();
	var x = JSON.parse(s);
	for (var i in x)
		set_state(document.getElementById(i), decode[x[i]]);
}

function reset_all(state) {
	var state = state || 'unchecked';
	var inputs = document.querySelectorAll('.menu input');
	for (var i = 0; i < inputs.length; i ++)
		set_state(inputs[i], state);
}

function set_states(e) {
	var children = document.querySelectorAll('input[data-parent="' + this.id + '"]');
	var state = next_state[this.dataset.state];
	set_state(this, state);
	for (var i = 0; i < children.length; i ++)
		set_state(children[i], state);
}

function set_state(el, state) {
	el.dataset.state = state;
	switch (state) {
		case 'unchecked':
			el.indeterminate = false;
			el.checked = false;
			break;
		case 'checked':
			el.indeterminate = false;
			el.checked = true;
			break;
		case 'indeterminate':
			el.indeterminate = true;
			el.checked = false;
			break;
	}

	recomposite_main();
}

function format_x1y1(x1, y1, x2, y2) {
	return '↖ ' + x1 + ',' + y1 + '<br />↘ ' + x2 + ',' + y2;
}

function draw() {
	document.getElementById('ind').indeterminate = true;
	var key_checkboxes = document.querySelectorAll('#key input');
	for (var i in key_checkboxes)
		key_checkboxes[i].onclick = function() { return false; };
	document.getElementById('example').onclick = example;
	document.getElementById('export').onclick = function() { window.prompt('Please copy the text below.', serialize()); };
	document.getElementById('import').onclick = function() { unserialize(window.prompt('Please paste your exported configuration below.', '')); };

	var main = document.getElementById('main');
	main_ctx = main.getContext('2d');
	main_ctx.scale(2, 2);
	// main_ctx.globalCompositeOperation = 'dest-out';
	main_ctx.fillStyle = '#7af';

	var span = document.getElementById('coords');
	main.onmousemove = function(e) {
		var s = '';
		var rx = (e.offsetX === undefined) ? e.layerX - e.currentTarget.offsetLeft : e.offsetX,
			ry = (e.offsetY === undefined) ? e.layerY - e.currentTarget.offsetTop  : e.offsetY;

		if (rx >= 0 || ry >= 0) {
			var d = main_ctx.getImageData(~~rx, ~~ry, 1, 1).data;

			if (d[3] !== 0)
				s = Math.floor(rx / 2) + ',' + Math.floor(ry / 2);
		}

		span.innerHTML = s;
	};

	b = document.getElementById('b');
	for (menu in coords) {
		var child = draw_menu(menu);
		b.appendChild(child);
	}

	all_inputs = document.querySelectorAll('.menu-list input');
}

function recomposite_main() {
	var gathered = { 'checked': [], 'unchecked': [], 'indeterminate': [] };
	for (var i = 0; i < all_inputs.length; i ++) {
		var input = all_inputs[i];
		gathered[input.dataset.state].push([input.dataset.id, input.dataset.parent]);
	}

	main_ctx.clearRect(0, 0, cw, ch);
	main_ctx.globalAlpha = 0.4;
	for (var i = 0; i < gathered.checked.length; i ++) {
		var rekt = gathered.checked[i];
		var xywh = to_xywh.apply(null, coords[rekt[1]][rekt[0]]);
		main_ctx.fillRect.apply(main_ctx, xywh);
	}
	for (var i = 0; i < gathered.indeterminate.length; i ++) {
		var rekt = gathered.indeterminate[i];
		var xywh = to_xywh.apply(null, coords[rekt[1]][rekt[0]]);
		main_ctx.clearRect.apply(main_ctx, xywh);
	}
}

function draw_menu(menu) {
	// Heading
	var section = document.createElement('div');
	section.setAttribute('class', 'menu');
	var div = document.createElement('div');
	div.setAttribute('class', 'menu-heading');
	var h = document.createElement('h3');

	var checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', menu);
	checkbox.setAttribute('data-state', 'unchecked');
	checkbox.onclick = set_states;
	h.appendChild(checkbox);
	h.insertAdjacentHTML('beforeend', '<label for="' + menu + '">' + menu + '</label>');
	div.appendChild(h);

	// Reset
	current_color = 0;

	var c = new_canvas();
	var ctx = c.getContext('2d');
	ctx.globalCompositeOperation = 'dest-over';
	div.appendChild(c);
	section.appendChild(div);

	var div2 = document.createElement('div');
	div2.setAttribute('class', 'menu-list');
	var ul = document.createElement('ul');

	for (rekt in coords[menu]) {
		var child_c = draw_rekt(rekt, menu, ctx);
		ul.appendChild(child_c);
	}

	div2.appendChild(ul);
	section.appendChild(div2);
	return section;
}

function draw_rekt(rekt, parent, parent_ctx) {
	// Heading
	var div = document.createElement('li');
	div.setAttribute('class', 'rekt');

	var checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', parent + rekt);
	checkbox.setAttribute('data-id', rekt);
	checkbox.setAttribute('data-parent', parent);
	checkbox.setAttribute('data-state', 'unchecked');
	checkbox.onclick = rotate_state;
	div.appendChild(checkbox);

	var color = palette[current_color ++];
	div.insertAdjacentHTML('beforeend',
		'<label for="' + parent + rekt + '">' +
		'<strong>' + rekt + '</strong>' +
		'<small style="background: ' + color + ';">' + format_x1y1.apply(null, coords[menu][rekt]) + '</small>' +
		'</label>');

	parent_ctx.fillStyle = color;
	var xywh = to_xywh.apply(null, coords[menu][rekt]);
	parent_ctx.fillRect.apply(parent_ctx, xywh);

	return div;
}

window.onload = draw;
