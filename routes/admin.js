const router = require('express').Router();
const dashboard = require('../controllers/DashboardController');
const category   = require('../controllers/CategoryControler');
const bank    = require('../controllers/BankController');
const item    = require('../controllers/ItemController');
const booking    = require('../controllers/BookingController');
const {uploadSingle, uploadMultiple}  = require('../middleware/multer');

//endpoint dashboard
router.get('/dashboard', dashboard.viewDashboard);
//endpoint categry
router.get('/category', category.viewCategory);
router.post('/category', category.addCategory);
router.put('/category', category.updateData);
router.delete('/category', category.deletData);
//endpoint bank
router.get('/bank', bank.viewBank);
router.post('/bank',uploadSingle,bank.insertBank);
router.put('/bank',uploadSingle,bank.editBank);
router.delete('/bank', bank.deleteData);
//endpoint item
router.get('/item', item.viewItem);
router.post('/item',uploadMultiple,item.addData);
//endpoint booking
router.get('/booking', booking.viewBooking);

module.exports = router;



