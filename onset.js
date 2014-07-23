document.addEventListener('DOMContentLoaded', function() {
	Load.all();
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
