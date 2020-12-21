const router = require('express').Router();
const LandingPageController = require('../controllers/api/landingPageController');
const DetailPageController = require('../controllers/api/detailPageController');
const BookingController = require('../controllers/api/bookingPageController');
const {uploadSingle, uploadMultiple}  = require('../middleware/multer');

router.get('/landing-page', LandingPageController.dataLandingPage);
router.get('/detail-page/:id', DetailPageController.detailPage);
router.post('/booking-page',uploadSingle, BookingController.bookingPage);

module.exports = router;