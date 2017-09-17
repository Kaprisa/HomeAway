const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	apartment: {
		type: mongoose.Schema.ObjectId,
		ref: 'Apartment'
	},
	dates: {
		start: Date,
		end: Date
	},
	paid: {
		type: Number,
		default: 0
	},
	sale: {
		type: Number,
		default: 0
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
})

orderSchema.virtual('range')
	.get(function() {
		return this.dates.end.getDate() - this.dates.start.getDate()
	})

// orderSchema.statics.getOrder = function(id) {
// 	return this.aggregate(
// 		{ $match: { _id: id } },//,
// 		//{ $lookup: { from: 'apartments', localField: 'apartment', foreignField: '_id', as: 'apartment' } },
// 		/*{ $project: {
// 			apartment: '$apartment',
// 			range: '$ROOT.range'
// 		}}*/
// 	)
// }

module.exports = mongoose.model('Order', orderSchema)