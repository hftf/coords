var Box = {
	checked:       { next: 'indeterminate', checked: true,  indeterminate: false, },
	indeterminate: { next: 'unchecked',     checked: false, indeterminate: true,  },
	unchecked:     { next: 'checked',       checked: false, indeterminate: false, },
};

var State = (function() {
	var _State = {
		state: {
			game: game,
			coords: [],
			checked: {},
			indeterminate: {},
		},

		replaceState: function() {
			window.history.replaceState(this.state, null, this.getUrl() + window.location.hash);
		},
		getUrl: function(state) {
			if (state === undefined)
				state = this.state;
			else
				for (var i in this.state)
					if (state[i] === undefined)
						state[i] = this.state[i];

			return '?' + [                  state.game,
				this._join('+', Object.keys(state.checked).sort()),
				this._join('-', Object.keys(state.indeterminate).sort()),
				this._join(';',             state.coords),
			].join('');
		},
		_split: function(s) {
			return s === undefined ? [] : s.split(',');
		},
		_join: function(prefix, s) {
			return s.length === 0 ? '' : prefix + s.join(',');
		},

		setAllFromUrl: function(search) {
			return this.setAll(this._url2state(search || decodeURIComponent(window.location.search)));
		},
		_url2state: function(search) {
			if (search === '')
				window.location.search = '?' + this.state.game;

			// '?hg;x,y+a,b,c-d,e,f'
			//                      ? hg           + a,b,c           - d,e,f         ; x,y
			//                      - --------     - ---------       - --------      - -------
			var m = search.match(/^\?(\w+)(?:\+([\wé,. ]+))?(?:-([\wé,. ]+))?(?:;(\d+,\d+))?$/);

			if (!m)
				throw 'Invalid query string: ' + search;

			return {
				game:                      m[1] ,      // 'hg'
				checked:       this._split(m[2]),      // ['a', 'b', 'c']
				indeterminate: this._split(m[3]),      // ['d', 'e', 'f']
				coords:                    m[4],       // 'x,y'
			};
		},
		setAll: function(state) {
			this.setGame(state.game);
			if (state.coords !== undefined)
				try {
					var r = text2coords(state.coords);
					this.setCoords([r.fx, r.fy]);
					list_overlaps(r);
				}
				catch (e) {
					console.error(e);
				}
			state.checked.map(this.setState('checked'));
			state.indeterminate.map(this.setState('indeterminate'));
		},
		setGame: function(game) {
			this.state.game = game;
		},
		setCoords: function(coords) {
			if (coords[0] < bounds[0] || coords[0] > bounds[2] || coords[1] < bounds[1] || coords[1] > bounds[3])
				throw 'Coordinate out of bounds. Bounds are from ' +
					bounds[0] + ',' + bounds[1] + ' to ' + bounds[2] + ',' + bounds[3] + '.';

			this.state.coords = coords;
		},
		setState: function(state) {
			if (!(state in Box))
				throw "Invalid state '" + state + "'";

			return function(id) {
				var el = document.getElementById(id);
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
			}.bind(this);
		},
	};
	_State.rotateState = (function(_this) { return function(e) {
		var currentState = this.dataset.state || 'unchecked';

		_this.setState(Box[currentState]['next'])(this.id);
		_this.replaceState();
		recomposite_main();
	}; })(_State);
	_State.rotateStates = (function(_this) { return function(e) {
		var currentState = this.dataset.state || 'unchecked',
			state = Box[currentState]['next'],
			setState = _this.setState(state);

		setState(this.id);
		var children = document.querySelectorAll('input[data-parent="' + this.dataset.self + '"][data-grandparent="' + this.dataset.parent + '"]');
		for (var i = 0; i < children.length; i ++)
			setState(children[i].id);

		_this.replaceState();
		recomposite_main();
	}; })(_State);
	for (var state in Box)
		_State['set' + state.charAt(0).toUpperCase() + state.slice(1)] = _State.setState(state);
	return _State;
})();

document.addEventListener('DOMContentLoaded', function() {
	Load.all();
	try {
		State.setAllFromUrl();
	}
	catch (e) {
		// TODO display error to user?
		console.error(e);
	}

	var inputs = document.querySelectorAll('.menu-list input');
	for (var i in inputs) {
		inputs[i].onclick = State.rotateState;
	}
	inputs = document.querySelectorAll('.menu-heading input');
	for (var i in inputs) {
		inputs[i].onclick = State.rotateStates;
	}
	draw();
	recomposite_main();
});
