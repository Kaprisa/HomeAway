const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const modgodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Невалидный E-Mail'],
		required: 'Необходимо указать E-Mail'
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'moderator'],
		default: 'user'
	},
	profile: {
		name: String,
		lastName: String,
		phone: String
	},
	deposit: {
		type: Number,
		default: 0
	},
	passport: {
		seria: String,
		number: String,
		who: String,
		when: String
	},
	orders: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Order'
	}],
	payHistory: {
		date: {
			type: Date,
			default: Date.now()
		},
		order: {
			type: mongoose.Schema.ObjectId,
			ref: 'Order'
		},
		money: {
			type: Number,
			default: 0
		}
	},
	resetPasswordToken: String,
	resetPasswordExpires: String
},
{
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

/*userSchema.virtual('gravatar')
	.get(function(){
		const hash = md5(this.email);
		return `https://s.gravatar.com/avatar/${hash}?s=40`;
	});*/


userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
userSchema.plugin(modgodbErrorHandler);

module.exports = mongoose.model('User', userSchema)