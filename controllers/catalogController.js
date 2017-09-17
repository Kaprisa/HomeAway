const mongoose = require('mongoose')
const Apartment = mongoose.model('Apartment')
/*
exports.getCatalog = async (req, res) => {
	const apartments = await Apartment.find()
	res.render('catalog', { name: 'catalog', apartments })
}*/

exports.getCatalog = async (req, res) => {
	res.redirect('/catalog/апартаменты/page/1');
}

exports.getCatalogPages = async (req, res) => {
	const sort = (req.query.sort ? req.query.sort : 'created');
	let sample = {};
	const type = req.params.type;
	sample.type = type;
	const page = req.params.page || 1;
	const limit = 3;
	const skip = ( page * limit ) - limit;
	const apartmentsPromise = Apartment.find(sample)
		.skip(skip)
		.limit(limit)
		//.select('name photo price _id')
		.sort({[sort]: 'desc'});
	//const modelsPromise = await Apartment.getModels(type);
	const apartmentsCountPromise = Apartment.count(sample);
	const [ count, apartments/*, models*/ ] = await Promise.all( [ apartmentsCountPromise, apartmentsPromise/*, modelsPromise*/ ]);
	const pages = Math.ceil( count / limit );
	if (req.query.axs) {
		if (!apartments.length && skip) return;
		res.render('partials/apartmentsList', { name: 'catalog', apartments, page, pages, count, type/*, models, modelSlug*/, sort}, function(err, html){
			res.send(html);
		});
	} else {
		if (!apartments.length && skip) {
			res.redirect(`/catalog/${type}/page/${pages}`);
			return;
		}
		res.render('catalog', {name: 'catalog', apartments, page, pages, count, type/*, models, modelSlug*/, sort});
	}	
}