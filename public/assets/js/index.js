import '../sass/pages/index.sass'
import counter from './modules/counter'
import mapInit from './modules/map-init'
import './modules/auth'
import { $, $$ } from './modules/bling'
import dropdown from './modules/dropdown'
import { numValidator } from './modules/inputValidator';
import calendar from './modules/calendar'
import { fadeIn } from './modules/animate'
import equalHeight from './modules/equalHeight'

equalHeight(document.querySelectorAll('.card__desc'))

$$('.js-number').forEach( input => numValidator(input));

counter(document.querySelector('.counter'))
mapInit()

dropdown(document.querySelector('.sort__dropdown'));
dropdown(document.querySelector('.type__dropdown'));

$$('.calendar__holder').forEach(item => {
	calendar(item)
	item.style.display = 'none'
	const input = item.parentElement.querySelector('input')
	input.addEventListener('focus', function() {
		if (item.style.display === 'none') {
			fadeIn(item)
		}
	})
})

$('#show-results').on('click', function(e) {
	e.preventDefault()
	const type = $('.type').querySelector('.dropdown__item_active') ? $('.type').querySelector('.dropdown__item_active').getAttribute('data-type') : 'апартаменты'
	location.href = `/catalog/${type}/page/1`
})
