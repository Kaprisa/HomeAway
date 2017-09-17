import '../sass/pages/apartments.sass'
import './modules/auth'
import popup, { showPopup } from './modules/popup'
import mapInit from './modules/map-init'
import './modules/auth'
import './modules/review'
import { $, $$ } from './modules/bling'

mapInit($('#map').getAttribute('data-lat'), $('#map').getAttribute('data-lng'))

$$('.gallery__item').on('click', function() {
	const img = this.getAttribute('src')
	const popup = $('.gallery-popup')
	popup.querySelector('.popup__content').style.backgroundImage = `url(${img})`
	showPopup(popup)
})

popup($('.reviews__rate-review'), $('.reviews-popup'));