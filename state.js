var Box = {
	checked:       { next: 'indeterminate', checked: true,  indeterminate: false, },
	indeterminate: { next: 'unchecked',     checked: false, indeterminate: true,  },
	unchecked:     { next: 'checked',       checked: false, indeterminate: false, },
};

var defaultGame = 'x';

var State = (function() {
	var _State = {
		state: {
			game: defaultGame,
			coords: [],
			checked: {},
			indeterminate: {},
			image: '',
		},
		split: undefined,
		parsed: {},

		replaceState: function() {
			window.history.replaceState(this.state, null, this.getUrl() + window.location.hash);
		},
		getCoords: function() {
			return this.state.coords.slice(0);
		},
		getImage: function() {
			return this.state.image;
		},
		getUrl: function(state) {
			if (state === undefined)
				state = this.state;
			else
				for (var i in this.state)
					if (state[i] === undefined)
						state[i] = this.state[i];

			return '?' + [                                    state.game,
				this._join('+', Encode.groupStars(Object.keys(state.checked).sort())),
				this._join('-', Encode.groupStars(Object.keys(state.indeterminate).sort())),
				this._join(';',                               state.coords),
				this._join('@',                               state.image),
			].join('');
		},
		_split: function(s) {
			return s === undefined ? [] : s.split(',');
		},
		_join: function(prefix, s) {
			var joined = ('string' === typeof s) ? s : s.join(',');
			return s.length === 0 ? '' : prefix + joined;
		},

		setSplitFromUrl: function(search) {
			return this.split = this.splitUrl(search);
		},
		setAllFromUrl: function(search) {
			if (this.split === undefined)
				this.setSplitFromUrl(search);
			this.parseAllSplit();
			return this.setAll(this.parsed);
		},
		splitUrl: function(search) {
			if (search === undefined)
				search = decodeURIComponent(window.location.search);

			if (search === '')
				window.location.search = '?' + this.state.game;

			// '?hg+a,b-c,d;x,y@z'
			//                      ? hg      + a,b           - c,d           ; x,y          @ z
			//                      ^ 1--     ^ 2-------      ^ 3-------      ^ 4------      ^ 5--
			var m = search.match(/^\?(\w+)(?:\+([\w,.*]+))?(?:-([\w,.*]+))?(?:;(\d+,\d+))?(?:@(\w+))?$/);

			if (!m)
				throw 'Invalid query string: ' + search;

			return {
				game:          m[1],
				checked:       m[2],
				indeterminate: m[3],
				coords:        m[4],
				image:         m[5],
			};
		},
		_identity: function(v) { return v; },
		_ungroup_split: function(v) { return Encode.ungroup(this._split(v)); },
		parse: {
			game:          '_identity',
			checked:       '_ungroup_split',
			indeterminate: '_ungroup_split',
			coords:        '_identity',
			image:         '_identity',
		},
		parseSplit: function(k, m) {
			return this.parsed[k] = this[this.parse[k]](this.split[k]);
		},
		parseAllSplit: function() {
			for (var k in this.parse)
				if (!(k in this.parsed))
					this.parseSplit(k);
			return this.parsed;
		},
		setAll: function(state) {
			this.setAll1(state);
			this.setAll2(state);
			this.setAll3(state);
		},
		setAll1: function(state) {
			return this.setGame(state.game);
		},
		setAll2: function(state) {
			this.setStates('checked', state.checked);
			this.setStates('indeterminate', state.indeterminate);
			if (state.coords !== undefined)
				try {
					var r = text2coords(state.coords);
					this.setCoords(r);
				}
				catch (e) {
					console.error(e);
				}
		},
		setAll3: function(state) {
			this.setImage(state.image);
			this.parsed = undefined;
		},

		setGame: function(game) {
			return this.state.game = game;
		},
		setCoords: function(coords) {
			if (coords.length === 0)
				return this.state.coords = [];

			if (coords[0] < bounds[0] || coords[0] > bounds[2] || coords[1] < bounds[1] || coords[1] > bounds[3])
				throw 'Coordinate out of bounds. Bounds are from ' +
					bounds[0] + ',' + bounds[1] + ' to ' + bounds[2] + ',' + bounds[3] + '.';

			this.state.coords = coords;
		},
		setImage: function(image) {
			var clear = false, img;
			if ((image === undefined || image === '') && (clear = true))
				image = '';

			else {
				if (!(image in Load.lookup))
					throw "No item exists with id '" + image + "'";

				var menu = Load.lookup[image];
				if (menu.length !== 2)
					throw "Item with id '" + image + "' is not a menu";

				img = document.getElementById(image + '-image');

				// Possible race condition between window.onload and image.onerror?
				if ('missing' in img.dataset && (clear = true))
					console.warn("Image with id '" + image + "' is missing. Blanking zoom layer.");
			}

			if (clear) {
				zoom_ctx.clear();
				reset_screenshot.style.display = 'none';
			}
			else {
				if (img.complete)
					zoom_ctx.drawScaledImage(img);
				else
					img.onload = function() { zoom_ctx.drawScaledImage(img); };
				reset_screenshot.style.display = null;
			}

			this.state.image = image;
		},
		getCheckboxId: function(id) {
			return '_' + id;
		},
		getCheckbox: function(id) {
			return document.getElementById(this.getCheckboxId(id));
		},
		getId: function(checkbox) {
			return checkbox.id.substr(1);
		},
		setStates: function(state, els) {
			for (var i = 0; i < els.length; i ++)
				this.setState(state, els[i]);
		},
		setState: function(state, el) {
			if (!(state in Box))
				throw "Invalid state '" + state + "'";

			var id;
			if ('string' === typeof el) // param 2 is an id
				id = el,
				el = this.getCheckbox(id);
			else // param 2 is an element
				id = this.getId(el);

			if (el === null)
				throw "No element exists with id '" + id + "'";

			var currentState = el.dataset.state || 'unchecked';
			// if (currentState === state)
			//	throw "Element with id '" + id + "' is already " + state;

			if (currentState in this.state)
				if (id in this.state[currentState])
					delete this.state[currentState][id];

			if (state in this.state)
				this.state[state][id] = true;

			el.dataset.state = state;
			el.checked = Box[state].checked;
			el.indeterminate = Box[state].indeterminate;
		},
		rotateState: function(el) {
			var currentState = el.dataset.state || 'unchecked';
			this.setState(Box[currentState].next, el);
		},
		rotateStates: function(el) {
			var currentState = el.dataset.state || 'unchecked',
				state = Box[currentState].next;

			this.setState(state, el);
			var children = document.querySelectorAll('input[data-parent="' + el.dataset.self + '"][data-grandparent="' + el.dataset.parent + '"]');
			this.setStates(state, children);
		},
		updateState: function(recomposite) {
			this.replaceState();
			if (recomposite)
				recomposite_main();
			list_overlaps(this.state.coords);
		},
	};

	var wrap = function(fn, recomposite) {
		return function() {
			var result = fn.apply(_State, arguments);
			_State.updateState(recomposite);
			return result;
		};
	};

	var State = {
		getCoords:     _State.getCoords.bind(_State),
		getImage:      _State.getImage.bind(_State),
		getUrl:        _State.getUrl.bind(_State),
		getCheckboxId: _State.getCheckboxId.bind(_State),
		getCheckbox:   _State.getCheckbox.bind(_State),
		getId:         _State.getId.bind(_State),

		setSplitFromUrl:   _State.setSplitFromUrl.bind(_State),
		parseSplit:        _State.parseSplit.bind(_State),

		replaceState:  wrap(_State.replaceState,  true),
		setAll:        wrap(_State.setAll,        true),
		setAllFromUrl: wrap(_State.setAllFromUrl, true),
		setGame:       wrap(_State.setGame,       true),
		setCoords:     wrap(_State.setCoords,     false),
		setImage:      wrap(_State.setImage,      false),
		setState:      wrap(_State.setState,      true),
		setStates:     wrap(_State.setStates,     true),
		rotateState:   wrap(_State.rotateState,   true),
		rotateStates:  wrap(_State.rotateStates,  true),
	};

	return State;
})();
