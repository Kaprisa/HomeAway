import '../sass/pages/catalog.sass'
import './modules/auth'
import './modules/order'
import { $$ } from './modules/bling'
import dropdown from './modules/dropdown'
import { numValidator } from './modules/inputValidator'
import { changePage, sort, changeType } from './modules/changePage'
import calendar from './modules/calendar'
import { fadeIn } from './modules/animate'

$$('.js-number').forEach( input => numValidator(input))

dropdown(document.querySelector('.sort__dropdown'))
dropdown(document.querySelector('.type__dropdown'))

changePage('pagination')
sort()
changeType()

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