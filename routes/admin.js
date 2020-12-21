const router = require('express').Router();
const dashboard = require('../controllers/DashboardController');
const category   = require('../controllers/CategoryControler');
const bank    = require('../controllers/BankController');
const item    = require('../controllers/ItemController');
const booking    = require('../controllers/BookingController');
const {uploadSingle, uploadMultiple}  = require('../middleware/multer');
const ItemController = require('../controllers/ItemController');
const FeatureController = require('../controllers/FeatureController');
const ActivityController  = require('../controllers/ActivityController');
const LoginController   = require('../controllers/LoginController');
const DashboardController = require('../controllers/DashboardController');
const Auth                = require('../middleware/auth');

//endpoint Login
router.get('/signin' ,LoginController.loginPage);
router.post('/signin',LoginController.loginAction);
router.use(Auth);
router.get('/logout',LoginController.logoutAction);
//endpoint dashboard
router.get('/dashboard', DashboardController.viewDashboard);
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
router.get('/item/showImage/:id', item.showImage);
router.get('/item/editPage/:id', item.showEditPage);
router.put('/item',uploadMultiple,item.editAction);
router.delete('/item', ItemController.deleteData);
//end point detail item
router.get('/item/show-detail-item/:id/:type', ItemController.detaiIitem);
    //end point feature
    router.post('/item/add-feature', uploadSingle, FeatureController.addDataFeature);
    router.delete('/item/delete-feature', FeatureController.deleteFeature);
    router.put('/item/edit-feature',uploadSingle,FeatureController.editFeature);
    //endpont activity
    router.post('/item/add-activity', uploadSingle ,ActivityController.addActivity);
    router.delete('/item/delete-activity', ActivityController.deleteActivity);
    router.put('/item/edit-activity',uploadSingle, ActivityController.editActivity);
//endpoint booking
router.get('/booking', booking.viewBooking);
router.get('/booking/detail-booking/:id', booking.viewDetailBooking);
router.get('/booking/update-status/:id/:status', booking.updateStatus);

module.exports = router;



