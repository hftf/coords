document.addEventListener('DOMContentLoaded', function() {
	Load.all();

	var inputs, i;

	inputs = document.querySelectorAll('.menu-list input');
	function rotateState(e) { State.rotateState(this); }
	for (i in inputs) {
		inputs[i].onclick = rotateState;
	}
	inputs = document.querySelectorAll('.menu-heading input');
	function rotateStates(e) { State.rotateStates(this); }
	for (i in inputs) {
		inputs[i].onclick = rotateStates;
	}

	var main = document.getElementById('main');
	main_scale = main.width / cw;
	mouse_scale = main.width / main.offsetWidth;

	all_inputs = document.querySelectorAll('.menu-list input');
});
window.onload = function() {
	// requires fonts
	Load.grid();

	// requires images
	try {
		State.setAllFromUrl();
	}
	catch (e) {
		// TODO display error to user?
		console.error(e);
	}
};
