const mongoose = require('mongoose')
const Order = mongoose.model('Order')
const User = mongoose.model('User')

exports.postOrder = async (req, res) => {
	req.body.customer = req.user._id
	req.body.apartment = req.params.id
	const order = await (new Order(req.body).save())
	const user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { orders: order._id } }, { new: true })
	res.send(order._id)
}

exports.getOrder = async (req, res) => {
	const order = await Order.findById(req.params.id).populate('apartment')
	const { apartment, _id, dates, paid } = order
	const booking = {
		dates,
		total: apartment.prices.day * order.range,
		paid,
		_id
	} 
	res.render('booking', { name: 'booking', apartment, booking })
}


exports.deleteOrder = async (req, res) => {
	const order = await Order.findById(req.params.id)
	const userPromise = User.findByIdAndUpdate(req.user._id, { $pull: { orders: order._id }, $inc: { deposit: order.paid } }, { new: true })
	const orderPromise = Order.remove({ _id: req.params.id })
	await Promise.all([ userPromise, orderPromise ])
	res.send('Success')
}