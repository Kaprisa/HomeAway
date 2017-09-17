import '../sass/pages/booking.sass'
import axios from 'axios'
import { $, $$ } from './modules/bling'
import popup, { dynamicPopup, hidePopup } from './modules/popup'
import { numValidator } from './modules/inputValidator'

popup($('#show-pay-popup'), $('.pay-popup'));

$('#pay').on('click', function(e) {
	e.preventDefault()
	const availableMoney = Number($('#money').innerHTML)
	const toPayMoney = Number($('#to-pay').innerHTML)
	const money = Number($('#pay-money').value)
	if (availableMoney < money) {
		dynamicPopup({ action: 'error', msg: 'У вас недостаточно средств. Пожалуйста, пополните ваш счёт или укажите меньшую сумму' })
		return
	}
	if (toPayMoney < money) {
		dynamicPopup({ action: 'error', msg: `Вы указали слишком большую сумму. С вас будет снято ${toPayMoney} руб.` })
		money = toPayMoney
		return
	}
	const data = { money }
	axios.post(this.getAttribute('data-serv'), data).then(res => {
		$('#pay-money').value = ''
		hidePopup($('.pay-popup'))
		document.querySelectorAll('#money').forEach(item => {
			item.innerHTML = res.data.money
		})
		const newToPayMoney = toPayMoney - money
		const newPaid = Number($('#paid').innerHTML) + money
		dynamicPopup({ action: 'success', msg: `Вы успешно заплатили. ${newToPayMoney === 0 ? '' : 'Вам осталось заплатить' + newToPayMoney + 'руб.'}!` })
		$$('#to-pay').forEach(item => {
			item.innerHTML = newToPayMoney
		})
		$('#paid').innerHTML = newPaid
	}).catch(err => {
		dynamicPopup({ action: 'error', msg: 'Оплата не удалась:(' })
		console.error(err)
	})
})

$('#remove').on('click', function() {
	axios.delete(this.getAttribute('data-serv')).then(res => {
		dynamicPopup({ action: 'success', msg: 'Заказ успешно удален' })
		location.href = '/account/bookings'
	}).catch(err => {
		dynamicPopup({ action: 'errors', msg: 'Не удалось удалить заказ' })
		console.error(err)
	})
})


$$('.js-number').forEach( input => numValidator(input));