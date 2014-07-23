var Encode = (function() {
	var _Encode = {
		_polygram: function(v) {
			return v.length > 1;
		},
		ungroup: function(a) {
			var r = [], i, j, prefix;
			for (i = 0; i < a.length; i ++)
				if (a[i].length > 3)
					for (prefix = a[i].substr(0, 2), j = 2; j < a[i].length; j ++)
						r.push(prefix + ((a[i][j] !== '.') ? a[i][j] : ''));
				else if (a[i][a[i].length - 1] === '*')
					r.push.apply(r, Load.lookup[a[i]].filter(this._polygram));
				else
					r.push(a[i]);
			return r;
		},
		group: function(a) {
			var r = [], i;
			for (i = 0; i < a.length; i ++)
				if (a[i].length === 3 &&
					r.length > 0 &&
					r[r.length - 1].length >= 2 &&
					r[r.length - 1].substr(0, 2) === a[i].substr(0, 2))
					r[r.length - 1] += ((r[r.length - 1].length === 2) ? '.' : '') + a[i][2];
				else
					r.push(a[i]);
			return r;
		},
		lookup: (function() {
			var lookup, max_depth = 3, cur;
			function get(obj, key) {
				return obj[key];
			}
			function ignore(v) {
				return !(v in ignore_ids)
			}
			function recurse(me) {
				if (me) {
					cur.push(me);

					var key = Draw._joinIds.apply(null, cur);
					if (key in lookup)
						throw "Key '" + key + "' not unique";
					lookup[key] = cur.slice(0);
				}

				var ret = key;
				if (cur.length < max_depth) {
					var o = Object.keys(cur.reduce(get, coords)).filter(ignore).map(recurse);
					if (key)
						lookup[key + '*'] = ret = Array.prototype.concat.apply([key], o);
				}
				cur.pop();
				return ret;
			}

			return function() {
				lookup = {}, cur = [];
				recurse();
				return lookup;
			};
		})(),
	};

	return _Encode;
})();
