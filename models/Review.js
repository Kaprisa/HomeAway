const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now()
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'Автор должен быть указан'
	},
	apartment: {
		type: mongoose.Schema.ObjectId,
		ref: 'Apartment',
		required: 'Вам следует указать апартаменты'
	},
	tripType: {
		type: String,
		default: 'Отдых'
	},
	main: {
		type: String,
		required: 'Ваш отзыв должен иметь текст'
	},
	good: {
		type: String,
		required: 'Укажите, что вам понравилось'
	},
	bad: {
		type: String,
		default: 'Нет такого'
	},
	rating: {
		type: Number,
		min: 1,
		max: 5
	}
});

function autopopulate(next) {
	this.populate('author');
	next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Review', reviewSchema);