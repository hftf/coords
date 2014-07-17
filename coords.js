var palette = [
	'rgb(200, 42,102)', 'rgb(232,157, 52)', 'rgb(206, 98,195)', 'rgb(178,223, 75)', 'rgb( 97,223,181)', 'rgb(255,135, 83)', 'rgb(255,255,111)',
	'rgb(223, 38, 65)', 'rgb(185,202,246)', 'rgb(217,142,  0)', 'rgb(255,255,  1)', 'rgb( 70,138,126)', 'rgb(255,189,211)', 'rgb(161, 38,148)',
	'rgb( 88,150, 62)', 'rgb(237,185, 52)', 'rgb( 85, 78,148)', 'rgb(255,198,187)', 'rgb(128,128,  0)', 'rgb(128 , 0, 64)', 'rgb(255,255,195)'
];

var b, current_color, all_inputs, reset_screenshot,
	zoom_img, main_ctx, varia_ctx, click_ctx,
	main_scale, mouse_scale,
	level_delim = ' › ',
	cw = bounds[2] - bounds[0] + 1;
	ch = bounds[3] - bounds[1] + 1;

function new_canvas() {
	var c = document.createElement('canvas');
	c.width  = cw;
	c.height = ch;
	return c;
}

function reset_all(state) {
	state = state || 'unchecked';
	var inputs = document.querySelectorAll('.menu input');
	State.setStates(state, inputs);
}

var crosshair_dpr = (function() {
	var result = {}, _crosshair_dpr = {
		1: { rects: [[-2, 0   ], [ 0,    -2], [-0.5,  -0.5 ]], inner: 0,    outer: 0.5  },
		2: { rects: [[-2, 0.25], [ 0.25, -2], [-0.25, -0.25]], inner: 0.25, outer: 0.75 },
	};
	function x1y1_to_xywh(r) {
		return [r[0], r[1], 1 - 2 * r[0], 1 - 2 * r[1]];
	}
	function xywh_to_f(rect, r, px) {
		return [
			rect[0] + r[0] - px,
			rect[1] + r[1] - px,
			rect[2]        + px * 2,
			rect[3]        + px * 2,
		];
	}
	for (var dpr in _crosshair_dpr) {
		(function(dpr) {
			var settings = _crosshair_dpr[dpr],
				xywhs = settings.rects.map(x1y1_to_xywh);

			result[dpr] = function(r) {
				function partial(px) {
					return function(rect) {
						return xywh_to_f(rect, r, px);
					};
				}
				return {
					inner: xywhs.map(partial(settings.inner)),
					outer: xywhs.map(partial(settings.outer)),
				};
			};
		})(dpr);
	}
	return result;
})();

function list_overlaps(r) {
	var span2 = document.getElementById('coords-click'),
		overlaps = document.getElementById('overlaps'),
		rekt, inside, input, x1y1,
		gathered = { 'checked': [], 'unchecked': [], 'indeterminate': [] };

	span2.value = r[0] + ',' + r[1];
	overlaps.style.display = 'block';

	var inner_outer = crosshair_dpr[window.devicePixelRatio](r);
	click_ctx.clear();
	click_ctx.fillStyle = '#fff';
	inner_outer.outer.forEach(function(v) {
		click_ctx.fillRect.apply(click_ctx, coords2main(v));
	});
	click_ctx.fillStyle = '#000';
	inner_outer.inner.forEach(function(v) {
		click_ctx.fillRect.apply(click_ctx, coords2main(v));
	});

	click_ctx.clearRect.apply(click_ctx, coords2main(r[0], r[1], 1, 1));

	for (var category in coords) {
		for (var menu in coords[category]) {
			if (menu === 'id') continue;
			if ('desc' in coords[category][menu]) continue;
			for (rekt in coords[category][menu]) {
				if (rekt === 'id') continue;
				x1y1 = coords[category][menu][rekt].coords;
				inside = (x1y1[0] <= r[0]) && (r[0] <= x1y1[2]) && (x1y1[1] <= r[1]) && (r[1] <= x1y1[3]);
				if (inside) {
					var id = Draw._joinIds(category, menu, rekt);
					input = State.getCheckbox(id);
					gathered[input.dataset.state].push('<a href="#' + id + '" class="overlap">' + menu + level_delim + rekt + '</a>');
				}
			}
		}
	}
	for (var i in gathered) {
		var el = document.getElementById('overlaps-' + i);
		el.innerHTML = gathered[i].join('');
		el.parentNode.style.display = (gathered[i].length === 0) ? 'none' : 'block';
	}

	draw_varia(r);
}

function draw_varia(r) {
	var rekt, inside, input, id, x1y1, varia_rect,
		hit = { 'checked': [], 'unchecked': [], 'indeterminate': [] },
		miss = { 'checked': [], 'unchecked': [], 'indeterminate': [] };

	for (var category in coords) {
		for (var menu in coords[category]) {
			if (menu === 'id') continue;
			if ('desc' in coords[category][menu]) continue;
			for (rekt in coords[category][menu]) {
				if (rekt === 'id') continue;
				x1y1 = coords[category][menu][rekt].coords;
				id = Draw._joinIds(category, menu, rekt);
				input = State.getCheckbox(id);
				inside = (x1y1[0] <= r[0]) && (r[0] <= x1y1[2]) && (x1y1[1] <= r[1]) && (r[1] <= x1y1[3]);
				(inside ? hit : miss)[input.dataset.state].push(x1y1);
			}
		}
	}

	var i, rect, xywh;
	varia_ctx.clear();
	varia_ctx.globalAlpha = 0.4;
	if (hit.indeterminate.length) {
		// Hit a button to avoid, show warning
		varia_ctx.fillStyle = '#f77';
		for (i = 0; i < hit.indeterminate.length; i ++) {
			rect = hit.indeterminate[i];
			xywh = coords2main(to_xywh(rect));
			varia_ctx.clearRect.apply(varia_ctx, xywh);
			varia_ctx.fillRect.apply(varia_ctx, xywh);
		}
	} else if (hit.checked.length) {
		// Hit a button to click, show variability
		varia_rect = bounds.slice(0);
		for (i = 0; i < hit.checked.length; i ++) {
			rect = hit.checked[i];
			varia_rect[0] = Math.max(varia_rect[0], rect[0]);
			varia_rect[1] = Math.max(varia_rect[1], rect[1]);
			varia_rect[2] = Math.min(varia_rect[2], rect[2]);
			varia_rect[3] = Math.min(varia_rect[3], rect[3]);
		}
		xywh = coords2main(to_xywh(varia_rect));
		varia_ctx.fillStyle = '#7f7';
		varia_ctx.fillRect.apply(varia_ctx, xywh);
		// Remove buttons to avoid from variability
		for (i = 0; i < miss.indeterminate.length; i ++) {
			rect = miss.indeterminate[i];
			xywh = coords2main(to_xywh(rect));
			varia_ctx.clearRect.apply(varia_ctx, xywh);
		}
	}
}

function format_x1y1(x1, y1, x2, y2) {
	return '↖ ' + x1 + ',' + y1 + '<br />↘ ' + x2 + ',' + y2;
}

function to_xywh(x1, y1, x2, y2) {
	if (x1.length)
		return to_xywh.apply(null, x1);
	else
		return [x1, y1, x2 - x1 + 1, y2 - y1 + 1];
}

function scale(s, x, y, w, h) {
	if (x.length)
		return x.map(function(n) { return Math.floor(s * n); });
	else
		return scale(s, [x, y, w, h]);
}

function coords2main(x, y, w, h) {
	return scale(main_scale, x, y, w, h);
}

function mouse2coords(e) {
	var x = (e.offsetX === undefined) ? e.layerX - e.currentTarget.offsetLeft : e.offsetX,
		y = (e.offsetY === undefined) ? e.layerY - e.currentTarget.offsetTop  : e.offsetY;

	return scale(1 / mouse_scale, [x, y]);
}

function text2coords(s) {
	var m = s.match(/^(\d+),(\d+)$/);
	if (!m)
		throw 'Invalid coordinate syntax.';

	return [~~m[1], ~~m[2]];
}

function recomposite_main() {
	var gathered = { 'checked': [], 'unchecked': [], 'indeterminate': [] },
		i, rekt, xywh;

	for (i = 0; i < all_inputs.length; i ++) {
		var input = all_inputs[i];
		gathered[input.dataset.state].push([input.dataset.self, input.dataset.parent, input.dataset.grandparent]);
	}

	main_ctx.clear();
	main_ctx.globalAlpha = 0.4;
	for (i = 0; i < gathered.checked.length; i ++) {
		rekt = gathered.checked[i];
		xywh = coords2main(to_xywh(coords[rekt[2]][rekt[1]][rekt[0]].coords));
		main_ctx.fillRect.apply(main_ctx, xywh);
	}
	for (i = 0; i < gathered.indeterminate.length; i ++) {
		rekt = gathered.indeterminate[i];
		xywh = coords2main(to_xywh(coords[rekt[2]][rekt[1]][rekt[0]].coords));
		main_ctx.clearRect.apply(main_ctx, xywh);
	}
}
