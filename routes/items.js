var express = require('express');
var router = express.Router();
const itemsControls = require('../controls/items');
const userAuthorization = require('../middlewares/userAuthorization');

/* GET home page. */
router.get('/loadCategoryItems/:cat', itemsControls.loadCategoryItems);
router.get('/fetchChars/:cat', itemsControls.fetchChars);
router.get('/fetchCats', itemsControls.fetchCats);
router.post('/filterItems', itemsControls.filterItems);
router.post('/getChars', itemsControls.getChars);
router.post('/addtowishlist', itemsControls.addtowishlist);
router.post('/getwishlist', itemsControls.getwishlist);
router.get('/getpurchases/:userId', itemsControls.getpurchases);
router.post('/rateitem', itemsControls.rateitem);
router.post('/updatecart', itemsControls.updatecart);
router.post('/addcomment', itemsControls.addcomment);
router.put('/checkcart', itemsControls.checkcart);
router.get('/search/:searchQuery', itemsControls.search);
router.get('/getitem/:id', itemsControls.getitem);
router.get('/getads', itemsControls.getads);
router.get('/getcomments/:id/:limit', itemsControls.getcomments);
router.get('/addvisit/:id', itemsControls.addvisit);
router.get('/getmostvisited/:cat', itemsControls.getmostvisited);
router.get('/getbestrated/:cat', itemsControls.getbestrated);
router.get('/getNewestItems', itemsControls.getNewestItems);
router.get('/getActorMovies/:name', itemsControls.getActorMovies);
router.get('/getTags', itemsControls.getTags);


module.exports = router;
