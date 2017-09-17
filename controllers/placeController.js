const mongoose = require('mongoose');
const Place = mongoose.model('Place');

exports.getPlaceEditor = (req, res) => {
	res.render('admin/editPlace', {name: 'admin'});
}

exports.deletePlace = async (req, res) => {
	await Place.remove({_id: req.params.id});
	res.send('Место успешно удалёно');
}

exports.getUpdatePlaceEditor = async (req, res) => {
	const place = await Place.findById(req.params.id);
	res.render('admin/editPlace', {name: 'admin', place});
}

exports.getPlaces = async (req, res) => {
	const placeGroups = await Place.getPlacesByTypes()
	//res.json(placeGroups)
	res.render('near', { name: 'near', placeGroups })
	/*const places = await Place.find();
	res.render('near', { name: 'near', places });*/
}

exports.getPlace = async (req, res) => {
	const place = await Place.findById(req.params.id);
	res.render('place', {name: 'place', place});
}

exports.addPlace = async (req, res) => {
	req.body.location.type = 'Point';
	const place= await (new Place(req.body).save());
	res.send('Success');
}

exports.updatePlace = async (req, res) => {
	req.body.location.type = 'Point';
	const place = await Place.findOneAndUpdate({_id: req.params.id}, req.body);
	console.log(place);
	res.send('Место успешно обновлёно!');
}

exports.mapPlaces = async (req, res) => {
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
	const places = await Place.find(q).select('_id description location name photo').limit(10);
	res.send(places);
}