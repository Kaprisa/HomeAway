const mongoose = require('mongoose')
const Apartment = mongoose.model('Apartment')
const fs = require('fs')
const path = require('path')

exports.getApartments = async (req, res) => {
	const { id } = req.params
	const apartment = await Apartment.findById(id).populate('reviews')
	const cards = await Apartment.find({ type: apartment.type, '_id': { $ne: id } }).limit(2)
	res.render('apartments', { name: 'apartments', apartment, cards })
}

exports.getApartmentEditor = (req, res) => {
	res.render('admin/editApartment', { name: 'admin' });
}

exports.getUpdateApartmentEditor = async (req, res) => {
	const apartment = await Apartment.findById(req.params.id);
	res.render('admin/editApartment', { name: 'admin', apartment });
}

exports.addApartment = async (req, res) => {
	req.body.owner = req.user._id;
	const apartment= await (new Apartment(req.body).save());
	res.send('Success');
}

exports.updateApartment = async (req, res) => {
	//console.log(req.params)
	req.body.owner = req.user._id
	const apartment = await Apartment.findOneAndUpdate( { _id: req.params.id } , req.body, { upsert: true, setDefaultsOnInsert: true});
	/*const apartment = await Apartment.findOneAndUpdate({_id: req.params.id}, req.body, {
		new: true,
		runValidators: true
	}).exec();*/
	//console.log(apartment.photo)
	/*fs.unlink(path.join(__dirname, `../public/uploads/${apartment.photo}`), (err) => {
	  if (err) throw err;
	  console.log(`successfully deleted ${apartment.photo}`);
	});*/
	res.send('Success');
}