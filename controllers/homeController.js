const mongoose = require('mongoose')
const Apartment = mongoose.model('Apartment')
const Place = mongoose.model('Place')

exports.getHome = async (req, res) => {
	/*const apartmentPromise =  Apartment.findOne()
	const placesPromise = Place.find().limit(3)
	const [ places, apartment ] = await Promise.all([ placesPromise, apartmentPromise ])*/
	const apartment =  await Apartment.findOne()
	const q = {
		location: {
			$near: {
				$geometry: {
					type: 'Point', 
					coordinates: apartment.location.coordinates.map(parseFloat)
				},
				$maxDistance: 10000
			}
		}
	}
	const places = await Place.find(q).select('_id description location name photo').limit(3)
	res.render('index', { name: 'index', apartment, places })
}

exports.getAbout = (req, res) => {
	res.render('about', { name: 'about' })
}