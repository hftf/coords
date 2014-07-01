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

function reset_all(state) {
	var state = state || 'unchecked';
	var inputs = document.querySelectorAll('.menu input');
	for (var i = 0; i < inputs.length; i ++)
		State.setState(state)(inputs[i].id);
}

function list_overlaps(r) {
	var span2 = document.getElementById('coords-click'),
		overlaps = document.getElementById('overlaps'),
		rekt, inside, input,
		gathered = { 'checked': [], 'unchecked': [], 'indeterminate': [] };

	span2.value = r.fx + ',' + r.fy;
	overlaps.style.display = 'block';

	for (category in coords) {
		for (menu in coords[category]) {
			if (menu === 'id') continue;
			for (rekt in coords[category][menu]) {
				if (rekt === 'id') continue;
				x1y1 = coords[category][menu][rekt].coords;
				inside = (x1y1[0] <= r.fx) && (r.fx <= x1y1[2]) && (x1y1[1] <= r.fy) && (r.fy <= x1y1[3]);
				if (inside) {
					var id = Draw._joinIds(category, menu, rekt);
					input = document.getElementById(id);
					gathered[input.dataset.state].push('<a href="#' + id + '" class="overlap">' + menu + ' → ' + rekt + '</a>');
				}
			}
		}
	}
	for (var i in gathered) {
		var el = document.getElementById('overlaps-' + i);
		el.innerHTML = gathered[i].join('');
		el.parentNode.style.display = (gathered[i].length === 0) ? 'none' : 'block';
	}
}

function format_x1y1(x1, y1, x2, y2) {
	return '↖ ' + x1 + ',' + y1 + '<br />↘ ' + x2 + ',' + y2;
}

function mouse2coords(e) {
	var x = (e.offsetX === undefined) ? e.layerX - e.currentTarget.offsetLeft : e.offsetX,
		y = (e.offsetY === undefined) ? e.layerY - e.currentTarget.offsetTop  : e.offsetY,
		fx = Math.floor(x / 2),
		fy = Math.floor(y / 2);

	return { x: x, y: y, fx: fx, fy: fy };
}

function text2coords(s) {
	var m = s.match(/^(\d+),(\d+)$/);
	if (!m)
		throw 'Invalid coordinate syntax.';

	var fx = ~~m[1],
		fy = ~~m[2],
		x = fx * 2,
		y = fy * 2;
	if (fx < bounds[0] || fx > bounds[2] || fy < bounds[1] || fy > bounds[3])
		throw 'Coordinate out of bounds. Bounds are from ' +
			bounds[0] + ',' + bounds[1] + ' to ' + bounds[2] + ',' + bounds[3] + '.';

	return { x: x, y: y, fx: fx, fy: fy };
}

function draw() {


	all_inputs = document.querySelectorAll('.menu-list input');
}

function recomposite_main() {
	var gathered = { 'checked': [], 'unchecked': [], 'indeterminate': [] };
	for (var i = 0; i < all_inputs.length; i ++) {
		var input = all_inputs[i];
		gathered[input.dataset.state].push([input.dataset.self, input.dataset.parent, input.dataset.grandparent]);
	}

	main_ctx.clearRect(0, 0, cw, ch);
	main_ctx.globalAlpha = 0.4;
	for (var i = 0; i < gathered.checked.length; i ++) {
		var rekt = gathered.checked[i];
		var xywh = to_xywh.apply(null, coords[rekt[2]][rekt[1]][rekt[0]].coords);
		main_ctx.fillRect.apply(main_ctx, xywh);
	}
	for (var i = 0; i < gathered.indeterminate.length; i ++) {
		var rekt = gathered.indeterminate[i];
		var xywh = to_xywh.apply(null, coords[rekt[2]][rekt[1]][rekt[0]].coords);
		main_ctx.clearRect.apply(main_ctx, xywh);
	}
}
