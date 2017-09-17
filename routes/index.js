const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const apartmentsController = require('../controllers/apartmentsController');
const contactsController = require('../controllers/contactsController');
const officeController = require('../controllers/officeController');
const placeController = require('../controllers/placeController');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const orderController = require('../controllers/orderController');


router.get('/contacts', contactsController.getContacts);
router.get('/contacts/:id', catchErrors(contactsController.getOfficeContacts));
router.get('/', catchErrors(homeController.getHome));
router.get('/about', homeController.getAbout);
router.get('/catalog', catchErrors(catalogController.getCatalog));
router.get('/near', catchErrors(placeController.getPlaces));
router.get('/reviews', catchErrors(reviewController.getReviews));
router.get('/catalog/:type/page/:page', catchErrors(catalogController.getCatalogPages));
router.get('/apartments/:id', catchErrors(apartmentsController.getApartments));
router.get('/account', userController.getAccount);
router.get('/account/:page', userController.getAccount);
router.get('/account/orders/:id', catchErrors(orderController.getOrder));
router.post('/register', userController.validateRegister, userController.register, authController.login, authController.afterLogin);
router.post('/login', authController.login, authController.afterLogin);
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPassword, catchErrors(authController.update));
router.get('/logout', authController.isLoggedIn, authController.logout);

router.get('/office/:id', catchErrors(officeController.getOffice));

router.post('/api/fileUpload', apiController.upload, catchErrors(apiController.resize), apiController.fileUpload)
router.get('/api/offices/near', catchErrors(officeController.mapOffices));
router.post('/api/deposit', catchErrors(apiController.addMoney))
router.post('/api/pay/:id', catchErrors(apiController.payForApartments))
router.post('/order/:id', catchErrors(orderController.postOrder))
router.delete('/order/:id/remove', catchErrors(orderController.deleteOrder))

router.post('/profile/update', catchErrors(userController.updateProfile))
router.post('/user/passport/change', catchErrors(userController.updatePassport))

router.get('/admin/apartments/edit', userController.isAdmin, apartmentsController.getApartmentEditor);
router.get('/admin/apartments/edit/:id', userController.isAdmin, catchErrors(apartmentsController.getUpdateApartmentEditor));
router.get('/admin/office/edit', userController.isAdmin, officeController.getOfficeEditor);
router.get('/admin/office/edit/:id', userController.isAdmin, catchErrors(officeController.getUpdateOfficeEditor));
router.get('/admin/place/edit', userController.isAdmin, placeController.getPlaceEditor);
router.get('/admin/place/edit/:id', userController.isAdmin, catchErrors(placeController.getUpdatePlaceEditor));
router.post('/apartments/add', catchErrors(apartmentsController.addApartment));
router.post('/office/add', catchErrors(officeController.addOffice));
router.post('/place/add', catchErrors(placeController.addPlace));
router.post('/apartments/add/:id', catchErrors(apartmentsController.updateApartment));
router.post('/office/add/:id', catchErrors(officeController.updateOffice));
router.post('/place/add/:id', catchErrors(placeController.updatePlace));

router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));
 
module.exports = router;
