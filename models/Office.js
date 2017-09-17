const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const officeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Пожалуйста, введите название офиса'
	},
	photo: String,
	phone: String,
	businessHours: [{
		start: String,
		end: String
	}],
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
	}

});

officeSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Office', officeSchema)