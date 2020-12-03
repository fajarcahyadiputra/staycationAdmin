const router = require('express').Router();
const dashboard = require('../controllers/DashboardController');
const category   = require('../controllers/CategoryControler');
const bank    = require('../controllers/BankController');
const item    = require('../controllers/ItemController');
const booking    = require('../controllers/BookingController');

router.get('/dashboard', dashboard.viewDashboard);
router.get('/category', category.viewCategory);
router.get('/item', item.viewItem);
router.get('/bank', bank.viewBank);
router.get('/booking', booking.viewBooking);

module.exports = router;



