// Reveals .esconder content once the Vturb/ConverteAI smartplayer CTA button is shown.
// The player injects ".smartplayer-anchor-button" into the DOM at page load, but keeps it
// collapsed (0x0) until the configured pitch time, when it gives the button real size.
// So we wait for the button to actually render (width & height > 0) — NOT just exist — and
// only then unhide every element flagged with ".esconder".
(function () {
	function isShown(el) {
		var r = el.getBoundingClientRect();
		return r.width > 0 && r.height > 0;
	}
	var poll = setInterval(function () {
		var btn = document.querySelector('.smartplayer-anchor-button');
		if (btn && isShown(btn)) {
			clearInterval(poll);
			document.querySelectorAll('.esconder').forEach(function (el) {
				el.classList.remove('esconder');
			});
		}
	}, 500);
})();
