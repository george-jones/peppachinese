export let rand = (function () {
	var o = { };

	// choose a random array element.  Returns [ element, index ]
	o.pick = function (a) {
		var idx;
		var el;

		idx = Math.floor(Math.random() * a.length);
		el = a[idx];

		return [el, idx];
	};

	// make shuffled copy of array
	o.shuffle = function (a) {
		var dupe = a.slice(); // copies array
		var ret = [ ];		
		var pick;

		while (dupe.length > 0) {
			pick = o.pick(dupe);
			dupe.splice(pick[1], 1);
			ret.push(pick[0]);
		}

		return ret;
	};

	// choose N random array elements.  Returns [ el1, el2, ... elN ]
	o.pickN = function (a, n) {
		var i = 0;
		var j = 0;
		var picked;
		var ret = [ ];
		var dupe = false;

		for (i=0; i < n; i++) {
			dupe = false;
			picked = o.pick(a);
			for (j=0; j < ret.length; j++) {
				if (ret[j] == picked[0]) {
					dupe = true;					
					break;					
				}
			}
			if (dupe) {
				i--;
			} else {
				ret.push(picked[0]);
			}
		}
		
		return ret;
	};

	// given a list of objects, each with a relative 'weight' property, returns
	// a function that when called, returns one of the objects at random, but
	// based on that weighting.
	o.weightedListPicker = function (a) {
		var i;
		var total_w = 0.0;
		var w;
		var items = [ ];
		var item;
		var curr_total = 0.0;
		var ret;

		// sum weights
		for (i=0; i < a.length; i++) {
			total_w += a[i].weight;
		}

		// make list of items, with a scaled w property that is increasing
		for (i=0; i < a.length; i++) {
			w = a[i].weight / total_w;
			curr_total += w;
			item = { "w": curr_total, "element": a[i] };
			items.push(item);
		}

		ret = function () {
			var v;
			var j;

			if (items.length == 0) {
				return null;
			}

			v = Math.random();
			for (j=0; j < items.length; j++) {
				if (items[j].w >= v) {
					return items[j].element;
				}
			}

			// we shouldn't get here, but if we do... just pick one
			return o.pick(items)[0].element;
		};

		return ret;
	};

	// returns a number between low and high
	o.rangeInt = function (low, high) {
		return low + Math.floor((1 + high - low) * Math.random());
	};

	return o;
})();