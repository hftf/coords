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
		getCoords: function() {
			return this.state.coords.slice(0);
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
					this.setCoords(r);
				}
				catch (e) {
					console.error(e);
				}
			state.checked.map(this.setState.checked);
			state.indeterminate.map(this.setState.indeterminate);
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
		setState: function(state, el) {
			if (!(state in Box))
				throw "Invalid state '" + state + "'";

			return this._setState(state, el);
		},
		_setState: function(state, el) {
			var id;
			if (typeof el === "string") {
				// ID
				id = el;
				el = document.getElementById(id);
			}
			else if (typeof el.length === "number") {
				// Multiple elements
				for (var i = 0; i < el.length; i ++)
					this._setState(state, el[i]);
				return;
			}
			else {
				// Element
				id = el.id;
			}

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
		updateState: function(recomposite) {
			this.replaceState();
			if (recomposite)
				recomposite_main();
			if (this.state.coords.length)
				list_overlaps(this.state.coords);
		},
	};
	_State.rotateState = (function(_this) { return function(e) {
		var currentState = this.dataset.state || 'unchecked';
		_this.setState(Box[currentState]['next'], this);
	}; })(_State);
	_State.rotateStates = (function(_this) { return function(e) {
		var currentState = this.dataset.state || 'unchecked',
			state = Box[currentState]['next'],
			setState = _this.setState[state];

		setState(this);
		var children = document.querySelectorAll('input[data-parent="' + this.dataset.self + '"][data-grandparent="' + this.dataset.parent + '"]');
		setState(children);
	}; })(_State);
	for (var state in Box)
		_State.setState[state] = (function(state) {
			return function(el) { return this.setState(state, el); }.bind(_State);
		})(state);

	var wrap = function(fn, recomposite, ctxt) {
		return function() {
			var result = fn.apply(ctxt || this, arguments);
			if (typeof result === "function") {
				return wrap(result, recomposite, ctxt);
			}
			else {
				_State.updateState(recomposite);
				return result;
			}
		};
	};

	var State = {
		getCoords:     _State.getCoords.bind(_State),
		getUrl:        _State.getUrl.bind(_State),
		replaceState:  wrap(_State.replaceState, true, _State),
		setAll:        wrap(_State.setAll, true, _State),
		setAllFromUrl: wrap(_State.setAllFromUrl, true, _State),
		setGame:       wrap(_State.setGame, true, _State),
		setCoords:     wrap(_State.setCoords, false, _State),
		setState:      wrap(_State.setState, true, _State),
		rotateState:   wrap(_State.rotateState, true),
		rotateStates:  wrap(_State.rotateStates, true),
	};

	return State;
})();

document.addEventListener('DOMContentLoaded', function() {
	Load.all();

	var inputs = document.querySelectorAll('.menu-list input');
	for (var i in inputs) {
		inputs[i].onclick = State.rotateState;
	}
	inputs = document.querySelectorAll('.menu-heading input');
	for (var i in inputs) {
		inputs[i].onclick = State.rotateStates;
	}

	draw();
	try {
		State.setAllFromUrl();
	}
	catch (e) {
		// TODO display error to user?
		console.error(e);
	}
});
