const express = require('express');
var router = express.Router();
const adminControls = require('../controls/admin');
const fileupload = require('../middlewares/fileupload');
const imageUpload = require('../middlewares/imageUpload');

router.post('/addCat', imageUpload, adminControls.addCat);
router.post('/addCat/:id', imageUpload, adminControls.addCat);
router.get('/getCats', adminControls.getCats);
router.get('/getCatData/:cat', adminControls.getCatData);
router.post('/updateCat', adminControls.updateCat);
router.get('/deleteCat/:id', adminControls.deleteCat);

router.post('/addAd', imageUpload, adminControls.addAd);
router.get('/getAdData/:id', adminControls.getAdData);
router.post('/updateAd/:id', imageUpload, adminControls.updateAd);
router.get('/deleteAd/:id', adminControls.deleteAd);

router.get('/getItems/:cat/:skip/:limit', adminControls.getItems);
router.post('/uploadItem', fileupload, adminControls.uploadItem);
router.post('/updateItem/:id', fileupload, adminControls.updateItem);
router.get('/getItemData/:id', adminControls.getItemData);
router.get('/getItemData/:id', adminControls.getItemData);
router.get('/deleteItem/:id', adminControls.deleteItem);
router.get('/findItems/:name', adminControls.findItems);

router.post('/updateInfo', imageUpload, adminControls.updateInfo);
router.get('/getInfo', adminControls.getInfo);

router.get('/getUsers', adminControls.getUsers);
router.get('/deleteUser/:id', adminControls.deleteUser);
router.get('/toggleUserRole/:id', adminControls.toggleUserRole);

router.get('/getUsersCarts', adminControls.getUsersCarts);
router.get('/cartStage/:id/:stage', adminControls.cartStage);

router.get('/getUsersChats', adminControls.getUsersChats);
router.get('/getUserChat/:email', adminControls.getUserChat);

router.get('/addVisitor', adminControls.addVisitor);
router.get('/getVisits', adminControls.getVisits);

router.get('/verify/:password', adminControls.verify);
router.get('/getDashboardData', adminControls.getDashboardData);


module.exports = router;
