document.addEventListener('DOMContentLoaded', function() {
	Load.all();

	var inputs = document.querySelectorAll('.menu-list input');
	for (var i in inputs) {
		inputs[i].onclick = function() {
			State.rotateState(this);
		};
	}
	inputs = document.querySelectorAll('.menu-heading input');
	for (var i in inputs) {
		inputs[i].onclick = function() {
			State.rotateStates(this);
		};
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
window.onload = function() {
	Load.grid();
};
