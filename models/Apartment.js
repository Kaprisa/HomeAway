const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const apartmentSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Пожалуйста, введите название апартаментов'
	},
	type: {
		type: String,
		trim: true,
		enum: ['студия', 'апартаменты']
	},
	photo: String,
	photos: [String],
	phone: String,
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	characteristics: {
		floor: Number,
		square: Number,
		places: Number,
		people: Number
	},
	prices: {
		day: Number,
		hour: Number
	},
	description: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now()
	},
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [{
			type: Number,
			required: 'Вам следует указать координаты!'
		}],
		address: {
			type: String,
			required: 'Вам следует указать адрес!'
		}
	},
	equipment: [{
		name: String,
		icon: String
	}]
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

apartmentSchema.index({location: '2dsphere'});

apartmentSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'apartment'
});

apartmentSchema.virtual('stars') 
	.get(function(){
		if (!this.reviews) return 0;
		const reviews = this.reviews;
		const length = reviews.length;
		if (!length) return 0;
		let sum = 0;
		reviews.forEach( review => {
			sum += review.rating;
		});	
		return Math.ceil( sum / length );
	});

module.exports = mongoose.model('Apartment', apartmentSchema)