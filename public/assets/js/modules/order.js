import { $, $$ } from './bling'
import axios from 'axios'
import { dynamicPopup } from './popup'
import smoothScroll from './smoothScroll'

function order() {
	$$('.js-order').on('click', function() {
		const id = this.getAttribute('data-id')
		const start = $('#enterDate').getAttribute('data-date')
		const end = $('#leaveDate').getAttribute('data-date')
		if (!start || !end) {
			dynamicPopup({action: 'error', msg: 'Пожалуйста, укажите даты вашего бронирования'})
			smoothScroll(document.body, 0, 2000)
			return
		}
		if (new Date(end) < new Date(start)) {
			dynamicPopup({action: 'error', msg: 'Дата окончания бронирования должна быть выше чем начала'})
			smoothScroll(document.body, 0, 2000)
			return
		}
		const data = {
			dates: {
				start,
				end 
			}
		}
		axios.post(`/order/${id}`, data).then(res => {
			dynamicPopup({ msg: 'Ваш заказ ждёт вас в личном кабинете!', action: 'success' })
			const a = document.createElement('a')
			a.className = 'btn btn_transparent'
			a.setAttribute('href', `/account/orders/${res.data}`)
			a.innerHTML = 'Посмотреть бронирование'
			this.parentElement.appendChild(a)
			this.remove()
		}).catch(err => {
			dynamicPopup({ msg: 'Ошибка бронирования:(', action: 'error' })
			console.error(err)
		})
	})
}

export default order()