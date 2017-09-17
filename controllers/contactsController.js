const mongoose = require('mongoose');
const Office = mongoose.model('Office');

exports.getContacts = (req, res) => {
	res.render('contacts', {name: 'contacts'});
}

exports.getOfficeContacts = async (req, res) => {
	const office = await Office.findById(req.params.id);
	res.render('contacts', {name: 'contacts', office});
}