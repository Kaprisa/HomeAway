import axios from 'axios';
import { hidePopup, dynamicPopup } from './popup';
import { $ } from './bling';

function review(){
	const popup = $('.reviews-popup');
	popup.querySelectorAll('.star').on('click', function(){
		let active = popup.querySelector('.star_active');
		if (active) {
			active.classList.remove('star_active');
		}
		this.classList.add('star_active');
	});
	$('#reviews-form').on('submit', function(e){
		e.preventDefault();
		const data = {
			main: popup.querySelector('#main').value,
			tripType: popup.querySelector('#tripType').value,
			good: popup.querySelector('#good').value,
			bad: popup.querySelector('#bad').value,
			rating: popup.querySelector('.star_active') ? popup.querySelector('.star_active').getAttribute('data-star') : 0
		}
		axios.post(this.action, data).then(res=> {
			hidePopup(popup);
			dynamicPopup({ action: 'success', msg: 'Спасибо за отзыв!' });
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Не удалось сохранить ваш отзыв:(' });
			console.error(err)
		});
	});
}

export default review();