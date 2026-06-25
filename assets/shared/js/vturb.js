// Reveals .esconder content once the Vturb/ConverteAI smartplayer CTA button appears.
// The player injects ".smartplayer-anchor-button" at the configured pitch time; we poll
// for it every 500ms and, when present, unhide every element flagged with ".esconder".
(function () {
	var poll = setInterval(function () {
		if (document.querySelector('.smartplayer-anchor-button')) {
			clearInterval(poll);
			document.querySelectorAll('.esconder').forEach(function (el) {
				el.classList.remove('esconder');
			});
		}
	}, 500);
})();
