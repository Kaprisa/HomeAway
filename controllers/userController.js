const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const promisify = require('es6-promisify');

exports.validateRegister = (req, res, next) => {
	req.checkBody('email', 'Указанный E-Mail не валиден').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extention: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Пароль не может быть пустым').notEmpty;
	req.checkBody('password', 'Пароль не может быть пустым').notEmpty;
	req.checkBody('confirmPassword', 'Подтвердите пароль').notEmpty;
	req.checkBody('confirmPassword', 'Пароли не совпадают').equals(req.body.password);
	const errors = req.validationErrors();
	if (errors) {
		//req.flash('error', errors.map(err => err.msg));
		//res.json(req.flash());
		return;
	}
	next();
}

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email});
	const register = promisify(User.register, User);
	await register(user, req.body.password);
	next();
}

exports.isAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next()
	} else {
		//req.fash('error', 'Вы должны иметь соответствующие права, чтобы продолжить');
		res.redirect('/');
	}
}

exports.getAccount = async (req, res) => {
	const page = req.params.page || 'profile'
	const data = {
		name: 'account',
		page
	}
	if (page === 'bookings') {
		const orders = await Order.find({ customer: req.user._id }).populate('apartment')
		data.orders = orders.map(order => {
			const { range, apartment, dates, paid, _id } = order
			const total = range * apartment.prices.day
			const paidDays = Math.floor(paid / (total / range))
			return { range, apartment: `${apartment.type} ${apartment.name}`, dates, paidDays, paid, total, _id }
		})
	}
	if (req.query.axs) {
		res.render(`partials/${page}`, data)
	} else {
		res.render('account', data)
	}
}

exports.updateProfile = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, { $set: { profile: req.body } }, { new: true })
	res.send(user.profile)
}

exports.updatePassport = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, { $set: { passport: req.body } }, { new: true })
	res.send('Success')
}



