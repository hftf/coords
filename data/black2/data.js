var game = 'black2';
var bounds =                [  0,   0,   255, 191];
var coords = {
"Battle": {
	"id": "b",
	"Battle": {
		"id": "b",
		"Fight":            { "id": "f", "coords": [  0,  23,   255, 143] },
		"Bag":              { "id": "b", "coords": [  0, 144,    79, 191] },
		"Run":              { "id": "r", "coords": [ 87, 151,   167, 191] },
		"Pokémon":          { "id": "p", "coords": [175, 144,   255, 191] },
	},
	"Fight": {
		"id": "f",
		"Attack 1":         { "id": "1", "coords": [  0,  31,   127,  79] },
		"Attack 2":         { "id": "2", "coords": [128,  31,   255,  79] },
		"Attack 3":         { "id": "3", "coords": [  0,  80,   127, 127] },
		"Attack 4":         { "id": "4", "coords": [128,  80,   255, 127] },
		"Rotate Left":      { "id": "j", "coords": [  0, 151,    79, 191] },
		"Rotate Right":     { "id": "k", "coords": [ 80, 151,   159, 191] },
		"Cancel":           { "id": "x", "coords": [175, 143,   255, 191] },
	},
	"Double battle": {
		"id": "d",
		"Foe 1":            { "id": "1", "coords": [  0,  31,   126,  87] },
		"Foe 2":            { "id": "2", "coords": [127,  31,   255,  87] },
		"Ally 1":           { "id": "a", "coords": [  0,  88,   126, 127] },
		"Ally 2":           { "id": "b", "coords": [127,  88,   255, 127] },
		"Cancel":           { "id": "x", "coords": [175, 143,   255, 191] },
	},
	"Bag": {
		"id": "g",
		"Restore":          { "id": "r", "coords": [  0,   7,   126,  70] },
		"Balls":            { "id": "b", "coords": [127,   7,   255,  70] },
		"Status":           { "id": "s", "coords": [  0,  79,   126, 142] },
		"Battle items":     { "id": "i", "coords": [127,  79,   255, 142] },
		"Last used":        { "id": "u", "coords": [  7, 151,   206, 191] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Pocket": {
		"id": "q",
		"Item 1":           { "id": "1", "coords": [  0,   7,   126,  54] },
		"Item 2":           { "id": "2", "coords": [127,   7,   255,  54] },
		"Item 3":           { "id": "3", "coords": [  0,  55,   126, 102] },
		"Item 4":           { "id": "4", "coords": [127,  55,   255, 102] },
		"Item 5":           { "id": "5", "coords": [  0, 103,   126, 150] },
		"Item 6":           { "id": "6", "coords": [127, 103,   255, 150] },
		"Previous":         { "id": "j", "coords": [  0, 151,    38, 191] },
		"Next":             { "id": "k", "coords": [ 39, 151,    78, 191] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Item": {
		"id": "i",
		"Use":              { "id": "u", "coords": [  7, 151,   206, 191] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Pokémon": { // Also for "use item on"
		"id": "p",
		"Pokémon 1":        { "id": "1", "coords": [  0,   0,   126,  47] },
		"Pokémon 2":        { "id": "2", "coords": [127,   7,   255,  54] },
		"Pokémon 3":        { "id": "3", "coords": [  0,  48,   126,  94] },
		"Pokémon 4":        { "id": "4", "coords": [127,  55,   255, 102] },
		"Pokémon 5":        { "id": "5", "coords": [  0,  95,   126, 142] },
		"Pokémon 6":        { "id": "6", "coords": [127, 103,   255, 150] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Switch": {
		"id": "s",
		"Switch":           { "id": "s", "coords": [ 51,  23,   202, 130] },
		"Summary":          { "id": "w", "coords": [  0, 151,   102, 191] },
		"Check moves":      { "id": "m", "coords": [103, 151,   206, 191] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Check moves": { // Almost the same as "Summary"
		"id": "c",
		"Move 1":           { "id": "1", "coords": [  0,  47,   126,  94] },
		"Move 2":           { "id": "2", "coords": [127,  47,   253,  94] },
		"Move 3":           { "id": "3", "coords": [  0,  95,   126, 142] },
		"Move 4":           { "id": "4", "coords": [127,  95,   253, 142] },
		"Previous":         { "id": "j", "coords": [  0, 151,    38, 191] },
		"Next":             { "id": "k", "coords": [ 39, 151,    78, 191] },
		"Summary":          { "id": "w", "coords": [ 95, 151,   198, 191] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
	"Move": {
		"id": "m",
		"Slot 1":           { "id": "1", "coords": [ 87, 151,   126, 166] },
		"Slot 2":           { "id": "2", "coords": [127, 151,   166, 166] },
		"Slot 3":           { "id": "3", "coords": [ 87, 167,   126, 182] },
		"Slot 4":           { "id": "4", "coords": [127, 167,   166, 182] },
		"Cancel":           { "id": "x", "coords": [215, 151,   255, 191] },
	},
},
"Overworld": {
	"id": "o",
	"Overworld": {
		"id": "a",
		"Pokémon":          { "id": "p", "coords": [  7,  23,   119,  63] },
		"Pokédex":          { "id": "d", "coords": [135,  23,   247,  63] },
		"Bag":              { "id": "b", "coords": [  7,  71,   119, 111] },
		"Trainer card":     { "id": "c", "coords": [135,  71,   247, 111] },
		"Save":             { "id": "s", "coords": [  7, 119,   119, 159] },
		"Options":          { "id": "o", "coords": [135, 119,   247, 159] },
		"Quit":             { "id": "q", "coords": [223, 167,   247, 191] },
	},
	"Bag": {
		"id": "b",
		"Items 1":          { "id": "1", "coords": [  0,  35,    48,  74] },
		"Items 2":          { "id": "2", "coords": [  0,  75,    49, 100] },
		"Free space 1":     { "id": "3", "coords": [ 49,   7,    94,  70] },
		"Free space 2":     { "id": "4", "coords": [ 49,  71,    57,  74] },
		"Key items":        { "id": "5", "coords": [ 58,  71,   108, 107] },
		"Medicine":         { "id": "6", "coords": [  0, 101,    38, 142] },
		"TMs":              { "id": "7", "coords": [ 39, 111,    70, 154] },
		"Berries 1":        { "id": "8", "coords": [ 67, 108,   106, 110] },
		"Berries 2":        { "id": "9", "coords": [ 71, 111,   106, 142] },
		"Item 1":           { "id": "a", "coords": [143,  11,   222,  34] },
		"Item 2":           { "id": "b", "coords": [143,  35,   222,  58] },
		"Item 3":           { "id": "c", "coords": [143,  59,   222,  82] },
		"Item 4":           { "id": "d", "coords": [143,  83,   222, 106] },
		"Item 5":           { "id": "e", "coords": [143, 107,   222, 130] },
		"Item 6":           { "id": "f", "coords": [143, 131,   222, 154] },
		"Register 1":       { "id": "A", "coords": [119,  11,   142,  34] },
		"Register 2":       { "id": "B", "coords": [119,  35,   142,  58] },
		"Register 3":       { "id": "C", "coords": [119,  59,   142,  82] },
		"Register 4":       { "id": "D", "coords": [119,  83,   142, 106] },
		"Register 5":       { "id": "E", "coords": [119, 107,   142, 130] },
		"Register 6":       { "id": "F", "coords": [119, 131,   142, 154] },
		"Scroll":           { "id": "i", "coords": [223,  15,   255, 150] },
		"Previous":         { "id": "j", "coords": [  0, 167,    22, 191] },
		"Next":             { "id": "k", "coords": [119, 167,   142, 191] },
		"Sort":             { "id": "l", "coords": [151, 167,   174, 191] },
		"Register":         { "id": "m", "coords": [175, 167,   190, 191] },
		"Quit":             { "id": "q", "coords": [191, 167,   214, 191] },
		"Cancel":           { "id": "x", "coords": [223, 167,   246, 191] },
	},
	"Bag item": {
		"id": "i",
		"Use":              { "id": "u", "coords": [151,  71,   255,  95] },
		"Give":             { "id": "g", "coords": [151,  96,   255, 119] },
		"Trash":            { "id": "t", "coords": [151, 120,   255, 143] },
		"Free space":       { "id": "f", "coords": [151, 144,   255, 167] },
		"Cancel":           { "id": "x", "coords": [151, 168,   255, 191] },
	},
	"Key item": {
		"id": "k",
		"Use":              { "id": "u", "coords": [151,  95,   255, 119] }, // "Walk" when on bike
		"Register":         { "id": "r", "coords": [151, 120,   255, 143] },
		"Free space":       { "id": "f", "coords": [151, 144,   255, 167] },
		"Cancel":           { "id": "x", "coords": [151, 168,   255, 191] },
	},
	"TM item": {
		"id": "h",
		"Use":              { "id": "u", "coords": [151, 119,   255, 143] },
		"Free space":       { "id": "f", "coords": [151, 144,   255, 167] },
		"Cancel":           { "id": "x", "coords": [151, 168,   255, 191] },
	},
	"TM teach": {
		"id": "l",
		"Move 1":           { "id": "1", "coords": [  7,  15,   143,  47] },
		"Move 2":           { "id": "2", "coords": [  7,  48,   143,  80] },
		"Move 3":           { "id": "3", "coords": [  7,  81,   143, 111] },
		"Move 4":           { "id": "4", "coords": [  7, 112,   143, 143] },
		"Forget":           { "id": "f", "coords": [  7, 159,   143, 191] },
		"Cancel":           { "id": "x", "coords": [231, 167,   255, 191] },
	},
	"Trash count": {
		"id": "t",
		"Trash":            { "id": "t", "coords": [127,  95,   230, 142] },
		"More":             { "id": "j", "coords": [233,  91,   255, 115] },
		"Less":             { "id": "k", "coords": [233, 116,   255, 139] },
	},
	"Trash confirm": {
		"id": "u",
		"Yes":              { "id": "y", "coords": [191,  47,   255,  71] },
		"No":               { "id": "x", "coords": [191,  72,   255,  95] },
	},
	"Pokémon": {
		"id": "p",
		"Pokémon 1":        { "id": "1", "coords": [  0,   7,   127,  55] },
		"Pokémon 2":        { "id": "2", "coords": [128,  15,   255,  63] },
		"Pokémon 3":        { "id": "3", "coords": [  0,  56,   127, 103] },
		"Pokémon 4":        { "id": "4", "coords": [128,  64,   255, 111] },
		"Pokémon 5":        { "id": "5", "coords": [  0, 104,   127, 151] },
		"Pokémon 6":        { "id": "6", "coords": [128, 112,   255, 159] },
		"Register":         { "id": "r", "coords": [183, 167,   206, 191] },
		"Quit":             { "id": "q", "coords": [207, 167,   222, 191] },
		"Cancel":           { "id": "x", "coords": [223, 167,   247, 191] },
	},
	"Pokémon Do": {
		"id": "d",
		"Summary":          { "id": "w", "coords": [151,   0,   255,  23] },
		"Move 1":           { "id": "1", "coords": [151,  24,   255,  47] },
		"Move 2":           { "id": "2", "coords": [151,  48,   255,  71] },
		"Move 3":           { "id": "3", "coords": [151,  72,   255,  95] },
		"Move 4":           { "id": "4", "coords": [151,  96,   255, 119] },
		"Switch":           { "id": "s", "coords": [151, 120,   255, 143] },
		"Item":             { "id": "i", "coords": [151, 144,   255, 167] },
		"Quit":             { "id": "q", "coords": [151, 168,   255, 191] },
	},
	"Pokémon Item": {
		"id": "j",
		"Give":             { "id": "g", "coords": [151,  95,   255, 119] }, // "Read" when holding mail
		"Take":             { "id": "t", "coords": [151, 120,   255, 143] },
		"Move":             { "id": "m", "coords": [151, 144,   255, 167] },
		"Quit":             { "id": "q", "coords": [151, 168,   255, 191] },
	},
	"Options": {
		"id": "o",
		"Speed Slow":       { "id": "s", "coords": [111,  23,   159,  47] },
		"Speed Mid":        { "id": "m", "coords": [160,  23,   207,  47] },
		"Speed Fast":       { "id": "f", "coords": [208,  23,   255,  47] },
		"Scene On":         { "id": "A", "coords": [111,  48,   183,  71] },
		"Scene Off":        { "id": "a", "coords": [184,  48,   255,  71] },
		"Style Shift":      { "id": "B", "coords": [111,  72,   183,  95] },
		"Style Set":        { "id": "b", "coords": [184,  72,   255,  95] },
		"Sound Stereo":     { "id": "C", "coords": [111,  96,   183, 119] },
		"Sound Mono":       { "id": "c", "coords": [184,  96,   255, 119] },
		"IR Save":          { "id": "D", "coords": [111, 120,   183, 143] },
		"IR No Save":       { "id": "d", "coords": [184, 120,   255, 143] },
		"Register":         { "id": "r", "coords": [ 47, 171,    71, 191] },
		"Quit":             { "id": "q", "coords": [ 79, 167,   103, 191] },
		"Confirm":          { "id": "c", "coords": [111, 167,   183, 191] },
		"Cancel":           { "id": "x", "coords": [184, 167,   255, 191] },
		"Save Yes":         { "id": "y", "coords": [151,  47,   255,  71] },
		"Save No":          { "id": "n", "coords": [151,  72,   255,  95] },
	},
},
"C-Gear": {
	"id": "y",
	"C-Gear": {
		"id": "c",
		"Power":            { "id": "p", "coords": [190, 170,   208, 188] },
	},
	"Power": {
		"id": "p",
		"Yes":              { "id": "y", "coords": [167,  47,   255,  71] },
		"No":               { "id": "x", "coords": [167,  72,   255,  95] },
	},
},
"PC": {
	"id": "p",
	"Deposit": {
		"id": "d",
		"Pokémon 1":        { "id": "1", "coords": [ 29,  55,    52,  78] },
		"Pokémon 2":        { "id": "2", "coords": [ 65,  63,    88,  86] },
		"Pokémon 3":        { "id": "3", "coords": [ 29,  87,    52, 110] },
		"Pokémon 4":        { "id": "4", "coords": [ 65,  95,    88, 118] },
		"Pokémon 5":        { "id": "5", "coords": [ 29, 119,    52, 142] },
		"Pokémon 6":        { "id": "6", "coords": [ 65, 127,    88, 150] },
		"Deposit":          { "id": "d", "coords": [167,  39,   255,  62] },
		"Summary":          { "id": "w", "coords": [167,  63,   255,  86] },
		"Marking":          { "id": "m", "coords": [167,  87,   255, 110] },
		"Release":          { "id": "r", "coords": [167, 111,   255, 134] },
		"Cancel":           { "id": "x", "coords": [167, 135,   255, 158] },
		"Exit PC":          { "id": "z", "coords": [199, 167,   222, 191] },
		"Quit":             { "id": "q", "coords": [231, 167,   255, 191] },
	},
	"Withdraw": {
		"id": "w",
		"Withdraw":         { "id": "d", "coords": [167,  39,   255,  62] },
		"Summary":          { "id": "w", "coords": [167,  63,   255,  86] },
		"Marking":          { "id": "m", "coords": [167,  87,   255, 110] },
		"Release":          { "id": "r", "coords": [167, 111,   255, 134] },
		"Cancel":           { "id": "x", "coords": [167, 135,   255, 158] },
		"Exit PC":          { "id": "z", "coords": [199, 167,   222, 191] },
		"Quit":             { "id": "q", "coords": [231, 167,   255, 191] },
	},
	"Release": {
		"id": "r",
		"Release Yes":      { "id": "y", "coords": [191,  95,   255, 119] },
		"Release No":       { "id": "x", "coords": [191, 120,   255, 143] },
	},
	"Box": {
		"id": "b",
		"Previous box":     { "id": "j", "coords": [  5,  17,    25,  37] },
		"Next box":         { "id": "k", "coords": [140,  17,   160,  37] },
		"Slot 1 (1,1)":     { "id": "1", "coords": [ 11,  39,    34,  62] },
		"Slot 2 (1,2)":     { "id": "2", "coords": [ 35,  39,    58,  62] },
		"Slot 3 (1,3)":     { "id": "3", "coords": [ 59,  39,    82,  62] },
		"Slot 4 (1,4)":     { "id": "4", "coords": [ 83,  39,   106,  62] },
		"Slot 5 (1,5)":     { "id": "5", "coords": [107,  39,   130,  62] },
		"Slot 6 (1,6)":     { "id": "6", "coords": [131,  39,   154,  62] },
		"Slot 7 (2,1)":     { "id": "7", "coords": [ 11,  63,    34,  86] },
		"Slot 8 (2,2)":     { "id": "8", "coords": [ 35,  63,    58,  86] },
		"Slot 9 (2,3)":     { "id": "9", "coords": [ 59,  63,    82,  86] },
		"Slot 10 (2,4)":    { "id": "A", "coords": [ 83,  63,   106,  86] },
		"Slot 11 (2,5)":    { "id": "B", "coords": [107,  63,   130,  86] },
		"Slot 12 (2,6)":    { "id": "C", "coords": [131,  63,   154,  86] },
		"Slot 13 (3,1)":    { "id": "D", "coords": [ 11,  87,    34, 110] },
		"Slot 14 (3,2)":    { "id": "E", "coords": [ 35,  87,    58, 110] },
		"Slot 15 (3,3)":    { "id": "F", "coords": [ 59,  87,    82, 110] },
		"Slot 16 (3,4)":    { "id": "G", "coords": [ 83,  87,   106, 110] },
		"Slot 17 (3,5)":    { "id": "H", "coords": [107,  87,   130, 110] },
		"Slot 18 (3,6)":    { "id": "I", "coords": [131,  87,   154, 110] },
		"Slot 19 (4,1)":    { "id": "J", "coords": [ 11, 111,    34, 134] },
		"Slot 20 (4,2)":    { "id": "K", "coords": [ 35, 111,    58, 134] },
		"Slot 21 (4,3)":    { "id": "L", "coords": [ 59, 111,    82, 134] },
		"Slot 22 (4,4)":    { "id": "M", "coords": [ 83, 111,   106, 134] },
		"Slot 23 (4,5)":    { "id": "N", "coords": [107, 111,   130, 134] },
		"Slot 24 (4,6)":    { "id": "O", "coords": [131, 111,   154, 134] },
		"Slot 25 (5,1)":    { "id": "P", "coords": [ 11, 135,    34, 158] },
		"Slot 26 (5,2)":    { "id": "Q", "coords": [ 35, 135,    58, 158] },
		"Slot 27 (5,3)":    { "id": "R", "coords": [ 59, 135,    82, 158] },
		"Slot 28 (5,4)":    { "id": "S", "coords": [ 83, 135,   106, 158] },
		"Slot 29 (5,5)":    { "id": "T", "coords": [107, 135,   130, 158] },
		"Slot 30 (5,6)":    { "id": "U", "coords": [131, 135,   154, 158] },
	},
},
"Misc": { /* (nicknames, Pokéathlon, etc.) */
	"id": "z",
	"Fly": {
		"id": "f",
		"Aspertia City":    { "id": "A", "coords": [  5, 148,    21, 156] },
		"Floccesy Town":    { "id": "B", "coords": [ 24, 122,    40, 130] },
		"Virbank City":     { "id": "C", "coords": [ 60, 122,    76, 130] },
		"Pokéstar Studios": { "id": "D", "coords": [ 55, 110,    71, 118] },
		"Castelia City":    { "id": "E", "coords": [123, 125,   139, 133] },
		"Join Avenue 1":    { "id": "F", "coords": [130, 100,   139, 106] },
		"Join Avenue 2":    { "id": "1", "coords": [123,  99,   139,  99] },
		"Join Avenue 3":    { "id": "2", "coords": [123, 107,   139, 107] },
		"Nimbasa City":     { "id": "G", "coords": [123,  86,   139,  94] },
		"Driftveil City":   { "id": "H", "coords": [ 65,  86,    81,  94] },
		"PWT":              { "id": "I", "coords": [ 68,  98,    84, 106] },
		"Mistralton City":  { "id": "J", "coords": [ 31,  62,    47,  70] },
		"Lentimas Town":    { "id": "K", "coords": [178,  62,   194,  70] },
		"Undella Town":     { "id": "L", "coords": [215,  62,   231,  70] },
		"Lacunosa Town":    { "id": "M", "coords": [181,  38,   197,  46] },
		"Opelucid City":    { "id": "N", "coords": [123,  38,   139,  46] },
		"Humilau City":     { "id": "O", "coords": [226,  31,   242,  39] },
		"Victory Road 1":   { "id": "P", "coords": [178,  11,   191,  18] },
		"Victory Road 2":   { "id": "3", "coords": [175,  19,   191,  19] },
		"Pokémon League":   { "id": "Q", "coords": [161,  10,   177,  18] },
		"Nuvema Town":      { "id": "R", "coords": [223, 153,   239, 161] },
		"Accumula Town":    { "id": "S", "coords": [223, 133,   239, 141] },
		"Striaton City":    { "id": "T", "coords": [219, 113,   235, 121] },
		"Nacrene City":     { "id": "U", "coords": [194, 113,   210, 121] },
		"Icirrus City":     { "id": "V", "coords": [ 65,  38,    81,  46] },
		"Black City":       { "id": "W", "coords": [181,  86,   197,  94] },
		"Quit":             { "id": "q", "coords": [199, 167,   223, 191] },
		"Cancel":           { "id": "x", "coords": [231, 167,   255, 191] },
	},
	"Name": {
		"id": "k",
		"A":                { "id": "A", "coords": [ 23,  39,    39,  63] },
		"B":                { "id": "B", "coords": [ 40,  39,    55,  63] },
		"C":                { "id": "C", "coords": [ 56,  39,    71,  63] },
		"D":                { "id": "D", "coords": [ 72,  39,    87,  63] },
		"E":                { "id": "E", "coords": [ 88,  39,   103,  63] },
		"F":                { "id": "F", "coords": [104,  39,   119,  63] },
		"G":                { "id": "G", "coords": [120,  39,   135,  63] },
		"H":                { "id": "H", "coords": [136,  39,   151,  63] },
		"I":                { "id": "I", "coords": [152,  39,   167,  63] },
		"J":                { "id": "J", "coords": [168,  39,   183,  63] },
		",":                { "id": "c", "coords": [200,  39,   215,  63] },
		".":                { "id": "d", "coords": [216,  39,   231,  63] },
		"K":                { "id": "K", "coords": [ 23,  64,    39,  87] },
		"L":                { "id": "L", "coords": [ 40,  64,    55,  87] },
		"M":                { "id": "M", "coords": [ 56,  64,    71,  87] },
		"N":                { "id": "N", "coords": [ 72,  64,    87,  87] },
		"O":                { "id": "O", "coords": [ 88,  64,   103,  87] },
		"P":                { "id": "P", "coords": [104,  64,   119,  87] },
		"Q":                { "id": "Q", "coords": [120,  64,   135,  87] },
		"R":                { "id": "R", "coords": [136,  64,   151,  87] },
		"S":                { "id": "S", "coords": [152,  64,   167,  87] },
		"T":                { "id": "T", "coords": [168,  64,   183,  87] },
		"'":                { "id": "a", "coords": [200,  64,   215,  87] },
		"-":                { "id": "b", "coords": [216,  64,   231,  87] },
		"U":                { "id": "U", "coords": [ 23,  88,    39, 111] },
		"V":                { "id": "V", "coords": [ 40,  88,    55, 111] },
		"W":                { "id": "W", "coords": [ 56,  88,    71, 111] },
		"X":                { "id": "X", "coords": [ 72,  88,    87, 111] },
		"Y":                { "id": "Y", "coords": [ 88,  88,   103, 111] },
		"Z":                { "id": "Z", "coords": [104,  88,   119, 111] },
		"♂":                { "id": "e", "coords": [200,  88,   215, 111] },
		"♀":                { "id": "f", "coords": [216,  88,   231, 111] },
		"0":                { "id": "0", "coords": [ 23, 136,    39, 159] },
		"1":                { "id": "1", "coords": [ 40, 136,    55, 159] },
		"2":                { "id": "2", "coords": [ 56, 136,    71, 159] },
		"3":                { "id": "3", "coords": [ 72, 136,    87, 159] },
		"4":                { "id": "4", "coords": [ 88, 136,   103, 159] },
		"5":                { "id": "5", "coords": [104, 136,   119, 159] },
		"6":                { "id": "6", "coords": [120, 136,   135, 159] },
		"7":                { "id": "7", "coords": [136, 136,   151, 159] },
		"8":                { "id": "8", "coords": [152, 136,   167, 159] },
		"9":                { "id": "9", "coords": [168, 136,   183, 159] },
		"Upper":            { "id": "u", "coords": [ 23, 160,    47, 183] },
		"Lower":            { "id": "l", "coords": [ 48, 160,    71, 183] },
		"Others":           { "id": "o", "coords": [ 72, 160,    95, 183] },
		"Qwerty":           { "id": "q", "coords": [ 96, 160,   119, 183] },
		"Delete":           { "id": "b", "coords": [120, 160,   175, 183] },
		"OK":               { "id": "u", "coords": [176, 160,   231, 183] },
	},
	"Daycare Store": {
		"id": "d",
		"Store":            { "id": "s", "coords": [151, 119,   255, 143] },
		"Summary":          { "id": "w", "coords": [151, 144,   255, 167] },
		"Quit":             { "id": "q", "coords": [151, 168,   255, 191] },
	},
	"Starters": {
		"id": "s",
		"Snivy":            { "id": "A", "coords": [ 33,  63,    85, 115] },
		"Tepig":            { "id": "B", "coords": [102,  63,   153, 115] },
		"Oshawott":         { "id": "C", "coords": [173,  63,   225, 115] },
		"Pick":             { "id": "p", "coords": [ 71, 167,   182, 191] },
		"Pick Yes":         { "id": "y", "coords": [183,  87,   255, 111] },
		"Pick No":          { "id": "x", "coords": [183, 112,   255, 135] },
	},
},
};
