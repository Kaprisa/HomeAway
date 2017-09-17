const mongoose = require('mongoose');
const Office = mongoose.model('Office');

exports.getOfficeEditor = (req, res) => {
	res.render('admin/editOffice', {name: 'admin'});
}

exports.deleteOffice = async (req, res) => {
	await Office.remove({_id: req.params.id});
	res.send('Офис успешно удалён');
}

exports.getUpdateOfficeEditor = async (req, res) => {
	const office = await Office.findById(req.params.id);
	res.render('admin/editOffice', {name: 'admin', office});
}

exports.getOffice = async (req, res) => {
	const office = await Office.findById(req.params.id);
	res.render('office', { name: 'office', office });
}

exports.addOffice = async (req, res) => {
	req.body.location.type = 'Point';
	const office= await (new Office(req.body).save());
	res.send('Success');
}

exports.updateOffice = async (req, res) => {
	req.body.location.type = 'Point';
	const office = await Office.findOneAndUpdate({_id: req.params.id}, req.body);
	console.log(office);
	res.send('Офис успешно обновлён!');
}

exports.mapOffices = async (req, res) => {
	const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
	const q = {
		location: {
			$near: {
				$geometry: {
					type: 'Point', 
					coordinates
				},
				$maxDistance: 10000
			}
		}
	};
	const offices = await Office.find(q).select('_id description location name photo').limit(10);
	res.send(offices);
}
