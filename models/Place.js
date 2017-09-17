const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	purpose: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true
	},
	photo: String,
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
	}
})

placeSchema.index({location: '2dsphere'});

placeSchema.statics.getPlacesByTypes = function() {
	return this.aggregate([
		{ $group: { _id: '$purpose', count: { $sum: 1 },  places: { $push : "$$ROOT" } } },
	])
}

module.exports = mongoose.model('Place', placeSchema)