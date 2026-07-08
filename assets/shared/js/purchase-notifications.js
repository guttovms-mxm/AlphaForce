// Bottles Bought
var stockNumber = 112;
const cNames = ['Jessica', 'James', 'Maria', 'Robert', 'Naomi', 'Samantha', 'Giulia', 'Joseph', 'Emmily', 'Daniel'];
const cLocals = ['California', 'Ohio', 'Pennsylvania', 'Michigan', 'Illinois', 'North Carolina', 'Georgia', 'Florida', 'Texas'];
const tBottles = [3, 6, 6];

const purchaseNotificationHTML = `
<!-- Purchase Notifications -->
<div id="purchase-notifications" class="purchases-disclaimer">
  <div class="purchases-box">
	<div class="purchased-bottle">
	  <img id="purchased-bottle-img" alt="">
	</div>
	<div class="purchase-info">
	  <span id="customer-name"></span> in <span id="customer-location"></span> just bought <span id="items-purchased"></span>!
	</div>
  </div>
</div>
<!-- END Purchase Notifications -->
`;
document.body.insertAdjacentHTML('beforeend', purchaseNotificationHTML);

// Prefetch das imagens do popup depois da janela de carregamento crítica (primeiro popup em t=12s)
setTimeout(function () {
	[3, 6].forEach(function (n) {
		new Image().src = '/assets/shared/products/bottles-' + n + '-sm.webp';
	});
}, 5000);

function bottlesBuying() {
	const randName = cNames[Math.floor(Math.random() * cNames.length)];
	const randLocal = cLocals[Math.floor(Math.random() * cLocals.length)];
	const randBottle = tBottles[Math.floor(Math.random() * tBottles.length)];

	stockNumber -= randBottle;

	document.querySelector('#purchased-bottle-img').src = '/assets/shared/products/bottles-' + randBottle + '-sm.webp';
	document.querySelector('#items-purchased').innerHTML = randBottle + ' bottles';

	document.querySelectorAll('.stock').forEach(e => e.innerHTML = stockNumber);
	document.querySelector('#customer-name').innerHTML = randName;
	document.querySelector('#customer-location').innerHTML = randLocal;
	document.querySelector('.purchases-disclaimer').style.right = '20px';

	setTimeout(() => {
		document.querySelector('.purchases-disclaimer').style.right = '-800px';
	}, 10000);

	if (stockNumber < 25) clearInterval(buyTimer);
}

var buyTimer = setInterval(bottlesBuying, 12000);