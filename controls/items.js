const Items = require('../models/items');
const Chars = require('../models/chars');
const Categories = require('../models/categories');
const Wishlist = require('../models/wishlist');
const Ads = require('../models/ads');
const Comments = require('../models/comments');

exports.loadCategoryItems = async(req, res) => {
    try {
        const cat = req.params.cat;
        const fetchedItems = await Items.find({category: cat});
        res.status(200).json({items: fetchedItems});
    } catch(err) {
        //throw new error(err);
        console.log(err);
    }
};
exports.fetchChars = async(req, res) => {
    try {
        const cat = req.params.cat;
        const fetchedChars = await Chars.findOne({category: cat});
        res.status(200).json({chars: fetchedChars});
    } catch(err) {
        console.log(err);
    }
};
exports.fetchCats = async(req, res) => {
    try {
        const fetchedCats = await Chars.find();
        res.status(200).json({cats: fetchedCats});
    } catch(err) {
        console.log(err);
    }
};
exports.getChars = async(req, res) => {
    try {
        const chars = await Items.getChars(req.body.cat, req.body.char);
        res.status(200).json({chars});
    } catch(err) {
        console.log(err);
    }
};
exports.getads = async(req, res) => {
    try {
        const ads = await Ads.find();
        res.status(200).json({ads});
    } catch(err) {
        console.log(err);
    }
};
exports.addcomment = async(req, res) => {
    try {
        console.log(req.body);
        const newcomment = await new Comments(req.body).save();
        console.log(newcomment);
        if(newcomment) {
            res.status(200).json({message: 'Review published successfully...'});
        } else {
            res.status(200).json({message: 'problem occured while publishing your review... please try again..'});
        }
    } catch(err) {
        console.log(err);
    }
};
exports.getcomments = async(req, res) => {
    try {
        const comments = await Comments.find({itemId: req.params.id}).limit(+req.params.limit).sort({date: -1});
        res.status(200).json({comments});
    } catch(err) {
        console.log(err);
    }
};
exports.search = async(req, res) => {
    try {
        const searchQuery = req.params.searchQuery;
        if(!searchQuery) { throw('no search query');}
        Items.createIndexes({name: "text", char1: "text", char2: "text", char3: "text", char4: "text", char5: "text"})
        const results = await Items.find({$text: {$search: searchQuery}});
        res.status(200).json({results});
    } catch(err) {
        console.log(err);
    }
};
exports.addtowishlist = async(req, res) => {
    try {
        const body = req.body;
        const wishlist = await Wishlist.find({userId: body.userId, done: 0});
        if(wishlist.length > 0 &&  wishlist[0].confirmed === 1) {
            res.json({event: 'You have purchase in process...'});
            return;
        }
        let event = '';
        if(wishlist.length === 0) {
            const addNew = await new Wishlist({userId: body.userId, items: [{itemId: body.itemId, price: body.price, name: body.name}]}).save();
            if(addNew) event = 'added';
        } else {
            const wish = {...wishlist[0]._doc};
            let isExist = false;
            wish.items.forEach(item => {
                if(item.itemId === body.itemId) {isExist = true};
            });
            console.log(isExist);
            if(!isExist) {
                const addToList = await Wishlist.update({userId: body.userId, confirmed: 0, done: 0}, {$push: {items: {itemId: body.itemId, price: body.price, name: body.name}}});
                if(addToList.nModified===1) event = 'added';
            } else {
                console.log('delete, pull', body);
                const removeFromList = await Wishlist.update({userId: body.userId, confirmed: 0, done: 0}, {$pull: {items: {itemId: body.itemId}}});
                const wishlist = await Wishlist.find({userId: req.body.userId, confirmed: 0, done: 0});
                const wish = {...wishlist[0]._doc};
                if(wish.items.length === 0) {
                    const del = await Wishlist.deleteOne({userId: body.userId, confirmed: 0, done: 0});
                    if(del) event = 'removed';
                }

                if(removeFromList.nModified===1) event = 'removed';
            }
        }
        res.status(200).json({event});
    } catch(err) {
        console.log(err);
    }
};
exports.getwishlist = async(req, res) => {
    try {
        const wishlist = await Wishlist.find({userId: req.body.userId, done: 0});
        const wish = wishlist.length > 0? {...wishlist[0]}._doc.items: [];
        res.status(200).json({
            wishlist: wish, 
            checked: wishlist[0].checked, 
            confirmed: wishlist[0].confirmed, 
            shiped: wishlist[0].shiped, 
            delievered: wishlist[0].delievered
        });
    } catch(err) {
        console.log(err);
    }
};
exports.getpurchases = async(req, res) => {
    try {
        const wishlist = await Wishlist.find({userId: req.params.userId, done: 1});
        const wish = wishlist.map(w => {return {items: {...w}._doc.items, total: w.totalPrice, date: w.date, id: w._id} || []});
        console.log(wish);
        res.status(200).json({
            purchases: wish,
        });
    } catch(err) {
        console.log(err);
    }
};
exports.updatecart = async(req, res) => {
    console.log(req.body);
    try {
        const userCart = await Wishlist.find({userId: req.body.userId, confirmed: 0, done: 0});
        const list = [...{...userCart[0]}._doc.items];
        const item = list.find(li => li.itemId === req.body.itemId);
        const index = list.findIndex(li => li.itemId === req.body.itemId);
        item['quantity'] = req.body.quantity;
        list.splice(index, 1);
        list.push(item);
        const update = await Wishlist.update({userId: req.body.userId, confirmed: 0, done: 0}, {items: list, totalPrice: req.body.total});
         console.log(update);
        if(update.nModified === 1) {
            res.status(200).json({done: true});
        }
    } catch(err) {
        console.log(err);
    }
};
exports.checkcart = async(req, res) => {
    try {
        const update = await Wishlist.update({userId: req.body.userId, done: 0}, {$bit: {checked: {xor: 1}}});
         console.log(update.nModified)
         if(update.nModified > 0) {
             res.status(200).json({done: true});
         } 
    } catch(err) {
        console.log(err);
    }
};
exports.getitem = async(req, res) => {
    try {
        const id = req.params.id;
        const item = await Items.findOne({_id: id});
        res.status(200).json({item});
    } catch(err) {
        console.log(err);
    }
};
exports.addvisit = async(req, res) => {
    try {
        const id = req.params.id;
        const item = await Items.update({_id: id}, {$inc: {visits: 1}});
        res.status(200).json({item});
    } catch(err) {
        console.log(err);
    }
};
exports.getmostvisited = async(req, res) => {
    try {
        console.log(req.params.cat);

        const find = req.params.cat !=='all'?Items.find({category: req.params.cat}): Items.find();
        const mostvisited = await find.sort({visits: -1}).limit(20);

        res.status(200).json({mostvisited});
    } catch(err) {
        console.log(err);
    }
};
exports.getbestrated = async(req, res) => {
    try {
        
        const find = req.params.cat !=='all'?Items.find({category: req.params.cat}): Items.find();
        const bestrated = await find.sort({rating: -1}).limit(20);

        res.status(200).json({bestrated});
    } catch(err) {
        console.log(err);
    }
};
exports.rateitem = async(req, res) => {
    try {
        const update = await Items.update({_id: req.body.itemId}, {$inc: {[req.body.star]: 1}});
        const f = await Items.findOne({_id: req.body.itemId});
        const total = f.star1+f.star2+f.star3+f.star4+f.star5;
        const rating = (f.star1+f.star2*2+f.star3*3+f.star4*4+f.star5*5)/total;
        if(update.nModified ===1 ) {
            const update2 = await Items.update({_id: req.body.itemId}, {rating: rating});
            if(update2.nModified ===1) {
                res.status(200).json({message: 'Rated successfully'});
            }
        } else {
            res.json({message: 'Not rated successfully'});
        }
    } catch(err) {
        console.log(err);
    }
};
exports.filterItems = async(req, res) => {
    try {
        const filters = req.body.filters;
        const cat = req.body.category;
        const pageData = req.body.pageData;
        const limit = +pageData.itemsPerPage;
        const skip = +pageData.currentPage*limit;
        const order = req.body.order;
        const orderBy = {}
        switch(order) {
            case 'best': orderBy['rating'] = -1;
            break;
            case 'newest': orderBy['_id'] = -1;
        }

        let mongoFilter = {};
        Object.keys(filters).forEach((key) => {
            mongoFilter[key] = {$in: filters[key]};
        });
        mongoFilter['category'] = cat;
        const count = await Items.find(mongoFilter).count();
        const filtered = await Items.find(mongoFilter).skip(skip).limit(limit).sort(orderBy);
        res.status(200).json({filtered, count});

    } catch(err) {
        console.log(err);
    }
};

exports.getActorMovies = async(req, res) => {
    let movies = await Items.find({actors: {$elemMatch: {name: req.params.name}} });
    if(movies.length===0) {
        movies = await Items.find({char1: req.params.name });
    }
    res.status(200).json({actorMovies: movies})
}

exports.getNewestItems = async(req, res) => {
    try {
        const newestItems = await Items.find().limit(30);
        res.status(200).json({newestItems});
    } catch(err) {
        res.json({message: err})
    }
}
exports.getTags = async(req, res) => {
    try {
        const a = Items.getTags('char1');
        const b = Items.getTags('char2');
        const c = Items.getTags('char3');
        const d = Items.getTags('char4');
        const e = Items.getTags('char5');
        [aa, bb, cc, dd, ee] = await Promise.all([a,b,c,d,e]);
        const alltags = [...aa, ...bb, ...cc, ...dd, ...ee];
        res.status(200).json({tags: alltags});
    } catch(err) {
        res.json({err})
    }
}


exports.tabItems = async(req, res) => {
    try {
        let searchQuery = req.params.searchQuery;
        if(!searchQuery) { throw('no search query');}
        Items.createIndexes({name: "text", char1: "text", char2: "text", char3: "text", char4: "text", char5: "text"})
        const items = await Items.find({$text: {$search: searchQuery}});
        res.status(200).json({items});
    } catch(err) {
        console.log(err);
    }
};