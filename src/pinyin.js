

export let pinyinSyllable = function (str, tone) {
	var vowels = {
		'a': [ '\u0101', '\u00E1', '\u01CE', '\u00E0' ],
		'e': [ '\u0113', '\u00E9', '\u011B', '\u00E8' ],
		'i': [ '\u012B', '\u00ED', '\u01D0', '\u00EC' ],
		'o': [ '\u014D', '\u00F3', '\u01D2', '\u00F2' ],
		'u': [ '\u016B', '\u00FA', '\u01D4', '\u00F9' ],
		'ü': [ '\u01D6', '\u01D8', '\u01DA', '\u01DC' ]
	};
	var i = 0;
	var c;
	var ret;

	str = str.split('v').join('ü');
	if (tone >= 5 || tone < 1) {
		return str;
	}

	for (i=0; i < str.length; i++) {
		c = str.charAt(i);
		if (c in vowels) {
			return str.substring(0, i) + vowels[c][tone-1] + str.substring(i+1);
		}
	}

	// this shouldn't happen.  but if it does, just return original string.
	return str;
};

export let pinyinString = function (str) {
	let i = 0;
	let blurbs = [ ];
	let char;
	let segment_start = 0;
	let num = 0;

	str = str.toLowerCase();
	for (i=0; i < str.length; i++) {
		char = str.charAt(i);
		if ('12345'.indexOf(char) !== -1) {
			blurbs.push(pinyinSyllable(str.slice(segment_start, i), parseInt(char, 10)));
			segment_start = i+1;
		}
	}

	if (segment_start < str.length) {
		blurbs.push(str.slice(segment_start, str.length));
	}

	return blurbs.join("");
}