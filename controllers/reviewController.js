const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
	req.body.author = req.user._id;
	req.body.apartment = req.params.id;

	const newReview = new Review(req.body);
	await newReview.save();
	res.send(newReview);
}

exports.getReviews = async (req, res) => {
	const reviews = await Review.find().populate('apartment')
	/*const reviews = bigReviews.map(review => {
		const { name, type } = review.apartment
		return { ...review, apartment: { name, type } }
	})*/
	//res.json(reviews)
	res.render('reviews', { name: 'reviews', reviews })
}