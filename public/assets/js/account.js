import '../sass/pages/account.sass'
import axios from 'axios'
import './modules/auth'
import { $, $$ } from './modules/bling'
import { profile, booking } from './modules/account'
import popup from './modules/popup'
import { numValidator } from './modules/inputValidator'
import './modules/money'

popup($('#show-money-popup'), $('.money-popup'))

$$('.account-navigation__link').on('click', function(e) {
	e.preventDefault()
	const page = this.getAttribute('href')
	axios.get(`${page}?axs=1`).then(res => {
		$('.account-tabs').innerHTML = res.data
		const state = { page }
		history.pushState(state, 'HotelHome', state.page)
		$('.account-navigation__item_active').classList.remove('account-navigation__item_active')
		this.parentElement.classList.add('account-navigation__item_active')
		let event = new Event('changePage');
		$('.account-tabs').dispatchEvent(event);
	}).catch(err => {
		console.error(err)
	})
})

$$('.js-number').forEach( input => numValidator(input));

function loadPage(path) {
  const locationArray = path.split('/');
  const page = locationArray[locationArray.length - 1]; 
  if ( page === 'profile' ) {
    profile();
  } /*else if ( page === 'bookings' ) {
    //blog();
  } else if ( page === 'history' ) {
    //works()
  }*/
}

window.onload = function() {
  loadPage(window.location.pathname);
}

$('.account-tabs').addEventListener('changePage', function(e) {
  loadPage(window.location.pathname);
});