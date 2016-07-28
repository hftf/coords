var game = 'pt';
var game_name = 'Platinum';
var bounds =                [  0,   0,   255, 191];
var coords = {
"Battle": {
	"id": "b",
	"Battle": {
		"id": "b",
		"Fight":            { "id": "f", "coords": [  0,  23,   253, 142], "ref": "bf"  },
		"Bag":              { "id": "b", "coords": [  0, 143,    78, 191], "ref": "bg"  },
		"Run":              { "id": "r", "coords": [ 87, 151,   166, 191], "ref": "END" },
		"Pokémon":          { "id": "p", "coords": [175, 143,   253, 191], "ref": "bp"  },
	},
	"Fight": {
		"id": "f",
		"Attack 1":         { "id": "1", "coords": [  0,  23,   126,  78], "ref": ["END", "bd"] },
		"Attack 2":         { "id": "2", "coords": [127,  23,   253,  78], "ref": ["END", "bd"] },
		"Attack 3":         { "id": "3", "coords": [  0,  87,   126, 142], "ref": ["END", "bd"] },
		"Attack 4":         { "id": "4", "coords": [127,  87,   253, 142], "ref": ["END", "bd"] },
		"Cancel":           { "id": "x", "coords": [  7, 151,   246, 191], "ref": "bb"  },
	},
	"Double battle": {
		"id": "d",
		"Foe 1":            { "id": "1", "coords": [  0,   7,   118,  78], "ref": "END" },
		"Foe 2":            { "id": "2", "coords": [135,   7,   253,  78], "ref": "END" },
		"Ally 1":           { "id": "a", "coords": [  0,  87,   118, 142], "ref": "END" },
		"Ally 2":           { "id": "b", "coords": [135,  87,   253, 142], "ref": "END" },
	},
	"Bag": {
		"id": "g",
		"Restore":          { "id": "r", "coords": [  0,   7,   125,  77], "ref": "bq"  },
		"Balls":            { "id": "b", "coords": [127,   7,   253,  77], "ref": "bq"  },
		"Status":           { "id": "s", "coords": [  0,  79,   125, 149], "ref": "bq"  },
		"Battle items":     { "id": "i", "coords": [127,  79,   253, 149], "ref": "bq"  },
		"Last used":        { "id": "u", "coords": [  0, 151,   205, 189], "ref": "bi"  },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bb"  },
	},
	"Pocket": {
		"id": "q",
		"Item 1":           { "id": "1", "coords": [  0,   7,   125,  53], "ref": "bi"  },
		"Item 2":           { "id": "2", "coords": [127,   7,   253,  53], "ref": "bi"  },
		"Item 3":           { "id": "3", "coords": [  0,  55,   125, 101], "ref": "bi"  },
		"Item 4":           { "id": "4", "coords": [127,  55,   253, 101], "ref": "bi"  },
		"Item 5":           { "id": "5", "coords": [  0, 103,   125, 149], "ref": "bi"  },
		"Item 6":           { "id": "6", "coords": [127, 103,   253, 149], "ref": "bi"  },
		"Previous":         { "id": "j", "coords": [  0, 151,    37, 189], "ref": "bq"  },
		"Next":             { "id": "k", "coords": [ 39, 151,    77, 189], "ref": "bq"  },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bg"  },
	},
	"Item": {
		"id": "i",
		"Use":              { "id": "u", "coords": [  0, 151,   205, 189], "ref": "END" },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bq"  },
	},
	"Pokémon": { // Also for "use item on"
		"id": "p",
		"Pokémon 1":        { "id": "1", "coords": [  0,   0,   125,  45], "ref": "bs"  },
		"Pokémon 2":        { "id": "2", "coords": [127,   7,   253,  53], "ref": "bs"  },
		"Pokémon 3":        { "id": "3", "coords": [  0,  47,   125,  93], "ref": "bs"  },
		"Pokémon 4":        { "id": "4", "coords": [127,  55,   253, 101], "ref": "bs"  },
		"Pokémon 5":        { "id": "5", "coords": [  0,  95,   125, 141], "ref": "bs"  },
		"Pokémon 6":        { "id": "6", "coords": [127, 103,   253, 149], "ref": "bs"  },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bb"  },
	},
	"Switch": {
		"id": "s",
		"Switch":           { "id": "s", "coords": [  7,   7,   245, 141], "ref": "END" },
		"Summary":          { "id": "w", "coords": [  0, 151,   101, 189], "ref": "NEW" },
		"Check moves":      { "id": "m", "coords": [103, 151,   205, 189], "ref": "bc"  },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bp"  },
	},
	"Check moves": { // Almost the same as "Summary"
		"id": "c",
		"Move 1":           { "id": "1", "coords": [  0,  47,   125,  93], "ref": "bm"  },
		"Move 2":           { "id": "2", "coords": [127,  47,   253,  93], "ref": "bm"  },
		"Move 3":           { "id": "3", "coords": [  0,  95,   125, 141], "ref": "bm"  },
		"Move 4":           { "id": "4", "coords": [127,  95,   253, 141], "ref": "bm"  },
		"Previous":         { "id": "j", "coords": [  0, 151,    37, 189], "ref": "bc"  },
		"Next":             { "id": "k", "coords": [ 39, 151,    77, 189], "ref": "bc"  },
		"Summary":          { "id": "w", "coords": [ 95, 151,   197, 189], "ref": "NEW" },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bs"  },
	},
	"Move": {
		"id": "m",
		"Slot 1":           { "id": "1", "coords": [ 87, 151,   125, 165], "ref": "bm"  },
		"Slot 2":           { "id": "2", "coords": [127, 151,   165, 165], "ref": "bm"  },
		"Slot 3":           { "id": "3", "coords": [ 87, 167,   125, 181], "ref": "bm"  },
		"Slot 4":           { "id": "4", "coords": [127, 167,   165, 181], "ref": "bm"  },
		"Cancel":           { "id": "x", "coords": [215, 151,   253, 189], "ref": "bc"  },
	},
},
"PC": {
	"id": "p",
	"Misc": {
		"id": "z",
		"Release":          { "id": "r", "coords": [167, 135,   253, 157], "ref": "   " },
		"Release No":       { "id": "x", "coords": [199, 127,   246, 158], "ref": "   " },
		"Release Yes":      { "id": "y", "coords": [199,  95,   246, 126], "ref": "   " },
		"See ya":           { "id": "q", "coords": [130, 122,   250, 161], "ref": "   " },
		"Quit all PCs":     { "id": "z", "coords": [  2, 147,   249, 186], "ref": "   " },
	},
},
"Overworld": {
	"id": "o",
	"Overworld": {
		"id": "a",
		"X":                { "id": "x", "coords": [  7,   0,   158,  14], "ref": "END" },
		"Pokédex":          { "id": "d", "coords": [ 15,  21,    74,  52], "ref": "NEW" },
		"Trainer card":     { "id": "c", "coords": [ 95,  21,   154,  52], "ref": "NEW" },
		"Pokémon":          { "id": "p", "coords": [ 15,  61,    74,  92], "ref": "op"  },
		"Save":             { "id": "s", "coords": [ 95,  61,   154,  92], "ref": "NEW" },
		"Bag":              { "id": "b", "coords": [ 15, 101,    74, 132], "ref": "ob"  },
		"Options":          { "id": "o", "coords": [ 95, 101,   154, 132], "ref": "NEW" },
		"Pokégear":         { "id": "y", "coords": [ 15, 141,    74, 172], "ref": "ys"  },
		"Register 1":       { "id": "1", "coords": [202,   7,   253,  37], "ref": "END" },
		"Register 2":       { "id": "2", "coords": [202,  45,   253,  75], "ref": "END" },
		"Running shoes":    { "id": "u", "coords": [183,  85,   253, 132], "ref": "END" },
		"A":                { "id": "a", "coords": [167, 143,   253, 186], "ref": "END" },
	},
	"Bag": {
		"id": "b",
		"Items":            { "id": "1", "coords": [  0,   0,    29,  29], "ref": "   " },
		"Medicine":         { "id": "2", "coords": [ 31,   0,    61,  29], "ref": "   " },
		"Balls":            { "id": "3", "coords": [ 63,   0,    93,  29], "ref": "   " },
		"TMs/HMs":          { "id": "4", "coords": [ 95,   0,   125,  29], "ref": "   " },
		"Berries":          { "id": "5", "coords": [127,   0,   157,  29], "ref": "   " },
		"Mail":             { "id": "6", "coords": [159,   0,   189,  29], "ref": "   " },
		"Battle items":     { "id": "7", "coords": [191,   0,   221,  29], "ref": "   " },
		"Key items":        { "id": "8", "coords": [223,   0,   253,  29], "ref": "   " },
		"Item 1":           { "id": "a", "coords": [  0,  31,   125,  71], "ref": "oi"  },
		"Item 2":           { "id": "b", "coords": [127,  31,   253,  71], "ref": "oi"  },
		"Item 3":           { "id": "c", "coords": [  0,  73,   125, 115], "ref": "oi"  },
		"Item 4":           { "id": "d", "coords": [127,  73,   253, 115], "ref": "oi"  },
		"Item 5":           { "id": "e", "coords": [  0, 117,   125, 151], "ref": "oi"  },
		"Item 6":           { "id": "f", "coords": [127, 117,   253, 151], "ref": "oi"  },
		"Previous":         { "id": "j", "coords": [  0, 167,    37, 189], "ref": "   " },
		"Next":             { "id": "k", "coords": [ 39, 167,    77, 189], "ref": "   " },
		"Cancel":           { "id": "x", "coords": [191, 167,   253, 189], "ref": "   " },
	},
	"Bag item": {
		"id": "i",
		"Use":              { "id": "u", "coords": [  0, 127,    91, 157], "ref": "   " }, // "Walk" when on bike
		"Trash":            { "id": "t", "coords": [ 95, 127,   189, 157], "ref": "   " }, // "Register" or "Deselect" in last pocket
		"Give":             { "id": "g", "coords": [  0, 159,    91, 189], "ref": "   " },
		"Move":             { "id": "m", "coords": [ 95, 159,   189, 189], "ref": "   " },
		"Cancel":           { "id": "x", "coords": [191, 167,   253, 189], "ref": "ob"  },
	},
	"Pokémon": {
		"id": "p",
		"Summary":          { "id": "w", "coords": [127,  23,   255,  54], "ref": "   " },
		"Switch":           { "id": "s", "coords": [127,  55,   255,  86], "ref": "   " },
		"Item":             { "id": "i", "coords": [127,  87,   255, 118], "ref": "   " },
		"Move 1":           { "id": "1", "coords": [  0,  15,   126,  46], "ref": "   " },
		"Move 2":           { "id": "2", "coords": [  0,  47,   126,  78], "ref": "   " },
		"Move 3":           { "id": "3", "coords": [  0,  79,   126, 110], "ref": "   " },
		"Move 4":           { "id": "4", "coords": [  0, 111,   126, 142], "ref": "   " },
	},
},
"Pokégear": {
	"id": "y",
	"Settings": {
		"id": "s",
		"Settings":         { "id": "s", "coords": [  7,  160,   54, 191], "ref": "   " },
		"Radio":            { "id": "r", "coords": [ 55,  160,  102, 191], "ref": "   " },
		"Map":              { "id": "m", "coords": [103,  160,  150, 191], "ref": "   " },
		"Phone":            { "id": "p", "coords": [151,  160,  198, 191], "ref": "yp"  },
		"Exit":             { "id": "x", "coords": [205,  160,  252, 191], "ref": "   " },
	},
	"Phone": {
		"id": "p",
		"Contact 1":        { "id": "1", "coords": [  7,   7,   222,  30], "ref": "   " },
		"Contact 2":        { "id": "2", "coords": [  7,  31,   222,  54], "ref": "   " },
		"Contact 3":        { "id": "3", "coords": [  7,  55,   222,  78], "ref": "   " },
		"Contact 4":        { "id": "4", "coords": [  7,  79,   222, 102], "ref": "   " },
		"Contact 5":        { "id": "5", "coords": [  7, 103,   222, 126], "ref": "   " },
		"Contact 6":        { "id": "6", "coords": [  7, 127,   222, 150], "ref": "   " },
		"Up":               { "id": "k", "coords": [223,   7,   246,  78], "ref": "   " },
		"Down":             { "id": "j", "coords": [223,  79,   246, 150], "ref": "   " },
		"Call":             { "id": "c", "coords": [111,  79,   238,  94], "ref": "   " },
		"Sort":             { "id": "s", "coords": [111, 103,   238, 118], "ref": "   " },
		"Quit":             { "id": "x", "coords": [111, 127,   238, 142], "ref": "ys"  },
	},
},
"Misc": { /* (nicknames, Pokéathlon, etc.) */
	"id": "z",
	"Mart": {
		"id": "m",
		"Buy":              { "id": "b", "coords": [  2,  26,   249,  66], "ref": "zb"  },
		"Sell":             { "id": "s", "coords": [  2,  73,   249, 113], "ref": "   " },
		"See ya":           { "id": "x", "coords": [  2, 122,   249, 162], "ref": "   " },
	},
	"Buy": {
		"id": "b",
		"Item 1":           { "id": "1", "coords": [  0,  31,   125,  71], "ref": "   " },
		"Item 2":           { "id": "2", "coords": [127,  31,   253,  71], "ref": "   " },
		"Item 3":           { "id": "3", "coords": [  0,  73,   125, 115], "ref": "   " },
		"Item 4":           { "id": "4", "coords": [127,  73,   253, 115], "ref": "   " },
		"Item 5":           { "id": "5", "coords": [  0, 117,   125, 151], "ref": "   " },
		"Item 6":           { "id": "6", "coords": [127, 117,   253, 151], "ref": "   " },
		"Previous":         { "id": "j", "coords": [  0, 167,    37, 189], "ref": "   " },
		"Next":             { "id": "k", "coords": [ 39, 167,    77, 189], "ref": "   " },
		"Cancel":           { "id": "x", "coords": [191, 167,   253, 189], "ref": "   " },
	},
	"Teach Dialog": {
		"id": "h",
		// Teach ___ to a Pokémon?
		"Teach to? Yes":    { "id": "y", "coords": [199,  47,   246,  78], "ref": "   " },
		"Teach to? No":     { "id": "x", "coords": [199,  79,   246, 110], "ref": "   " },
		// Should a move be replaced with ___?
		"Should? Yes":      { "id": "Y", "coords": [199,  80,   246, 110], "ref": "zl"  }, // TODO fix 80
		"Should? No":       { "id": "X", "coords": [199, 111,   246, 142], "ref": "   " },
	},
	"Teach Move": {
		"id": "l",
		"Move 1":           { "id": "1", "coords": [  7,   7,   125,  37], "ref": "   " },
		"Move 2":           { "id": "2", "coords": [  7,  39,   125,  69], "ref": "   " },
		"Move 3":           { "id": "3", "coords": [  7,  71,   125, 101], "ref": "   " },
		"Move 4":           { "id": "4", "coords": [  7, 103,   125, 133], "ref": "   " },
		"Forget":           { "id": "f", "coords": [  7, 151,   125, 181], "ref": "   " },
	},
},
};
