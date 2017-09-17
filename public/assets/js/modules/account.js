import { $ } from './bling'
import { dynamicPopup } from './popup'
import axios from 'axios'

export function profile() {
	$('#profile').on('submit', function(e) {
		e.preventDefault()
		const data = {
			name: $('#name').value,
			lastName: $('#surname').value,
			phone: $('#phone').value
		}
		axios.post(this.action, data).then(res => {
			this.reset()
			dynamicPopup({ action: 'success', msg: 'Ваш профиль успешно обновлён!' })
		}).catch( err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка обновления профиля...!' })
			console.error(err)
		})
	})
	$('#passport').on('submit', function(e) {
		e.preventDefault()
		const data = {
			seria: $('#seria').value,
			number: $('#num').value,
			who: $('#who').value,
			when: $('#when').value
		}
		axios.post(this.action, data).then(res => {
			this.reset()
			dynamicPopup({ action: 'success', msg: 'Ваши пасспортные данные успешно обновлёны!' })
		}).catch( err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка обновления данных...!' })
			console.error(err)
		})
	})
}

export function booking() {

}

export function historyOfPaid() {

}

