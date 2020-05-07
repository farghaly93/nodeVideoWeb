const Chars = require('../models/chars');
const Ads = require('../models/ads');
const Items = require('../models/items');
const Comments = require('../models/comments');
const MainPage = require('../models/MainPage');
const Visitors = require('../models/visitors');
const Users = require('../models/users');
const Messages = require('../models/messages');
const Wishlist = require('../models/wishlist');


/////////////////// MAIN INFORMATION ///////////////////////////
exports.updateInfo = async(req, res) => {
    try {
        console.log(req.body);
        const info = await MainPage.find();
        console.log(info);
        if(info.length > 0) {
            const id = info[0]._id;
            req.body['image'] = req.file?'http://'+req.headers.host+'/images/'+req.file.filename:req.body.file;
            update = await MainPage.updateOne({_id: id}, req.body);
            console.log(update);
            if(update.nModified === 1 ) {
                res.json({message: 'Main page updated successfully..'});
            } else {
                res.json({message: 'Main page not updated error happened try again...'});
            }
        } else {
            req.body['image'] = 'http://'+req.headers.host+'/images/'+req.file.filename;
            const newInfo = await new MainPage(req.body).save();
            console.log(newInfo);
            if(newInfo) {
                res.json({message: 'Main page updated successfully..'});
            } else {
                res.json({message: 'Main page not updated error happened try again...'});
            }
        }
} catch(err) {
    console.log(err);
    res.json({message: 'Main page not updated'});
    }
}
exports.getInfo = async(req, res) => {
    try {
        const info = await MainPage.find();
        res.status(200).json({info: info[0]});
    } catch(err) {
        res.json({message: 'some thing wrong happened'});
    }
}
///////////////////////////////////////////// CATEGORIES /////////////////////////////////
exports.addCat = async(req, res) => {
    try {
        console.log(req.body);
        let addchar, update = null; 
        if(!req.params.id) {
            req.body['image'] = 'http://'+req.headers.host+'/images/'+req.file.filename;
            addchar = await new Chars(req.body).save();
        }
        else {
            req.body['image'] = req.file?'http://'+req.headers.host+'/images/'+req.file.filename:req.body.file;
            update = await Chars.updateOne({_id: req.body._id}, req.body);
            console.log(update);
        }
        if(addchar || update.nModified === 1 ) {
            res.json({message: 'category added successfully..'});
        } else {
            res.json({message: 'category not added error happened try again...'});
        }
} catch(err) {
    console.log(err);
    res.json({message: 'category not added category maybe already exists...'});
    }
}
exports.getCats = async(req, res) => {
    const cats = await Chars.find();
    res.json({cats});
}
exports.getCatData = async(req, res) => {
    try {
        const cat = req.params.cat;
        const catData = await Chars.findOne({category: cat});
        res.json({catData});
} catch(err) {
    res.json({message: 'category not added category maybe already exists...'});
    }
}

exports.updateCat = async(req, res) => {
    try {
        const cat = req.prams.cat;
        const update = await Chars.update({category: cat}, req.body);
        if(update.nModified===1) {
            res.json({message: 'category data updated...'});
        }
} catch(err) {
    res.json({message: 'category data not updated.. try again...'});
    }
}

exports.deleteCat = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const delcat= await Chars.deleteOne({_id: id});
        if(delcat) {
            const cats = await Chars.find();
            res.json({cats});
        }
} catch(err) {
    res.json({message: 'category didn\'t deleted.. try again...'});
    }
}



///////////////////////////////////////////// ADVERTISMENTS /////////////////////////////////
exports.addAd = async(req, res) => {
    try {
        req.body['image'] = 'http://'+req.headers.host+'/images/'+req.file.filename;
        const addAd = await new Ads(req.body).save();
        console.log(req.body);
        if(addAd) {
            res.json({message: 'Ad added successfully..'});
        } else {
            res.json({message: 'Ad not added error happened try again...'});
        }
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}

exports.getAdData = async(req, res) => {
    try {
        const id = req.params.id;
        const adData = await Ads.findOne({_id: id});
        res.json({adData});
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.updateAd = async(req, res) => {
    try {
        delete req.body.file;
        req.body['image'] = req.file?'http://'+req.headers.host+'/images/'+req.file.filename: req.body.file;
        const id = req.params.id;
        const update = await Ads.update({_id: id}, req.body);
        if(update.nModified===1) {
            res.json({message: 'Ad data updated...'});
        }
} catch(err) {
    res.json({message: 'Update ad problem.. try again...'});
    }
}

exports.deleteAd = async(req, res) => {
    try {
        const id = req.params.id;
        const deletead = await Ads.deleteOne({_id: id});
        if(deletead) {
            const ads = await Ads.find();
            res.json({ads});
        }
} catch(err) {
    res.json({message: 'Ad didn\'t deleted.. try again...'});
    }
}
///////////////////////////////////////////// ITEMS /////////////////////////////////
exports.getItems = async(req, res) => {
    try {
        const skip = +req.params.skip;
        const limit = +req.params.limit;
        const find = {};
        if(req.params.cat !== 'all') {
            find['category'] = req.params.cat;
        }
        console.log(find);
        const count = await Items.find(find).count();
        const items = await Items.find(find).skip(skip).limit(limit);
            res.json({items, count});
} catch(err) {
    res.json({message: 'Items not added...'});
    }
}
exports.uploadItem = async(req, res) => {
    try {
        req.body['actors'] = JSON.parse(req.body.actors);
        req.body['image'] = 'http://'+req.headers.host+'/images/'+req.files.image[0].filename;
        const video = {};
        video[req.body.episode] = 'http://'+req.headers.host+'/images/'+req.files.video[0].filename;
        req.body['video'] = video;
        console.log(req.body);
        const newItem = await new Items(req.body).save();
        if(newItem) {
            res.json({message: 'uploaded'});
        }
} catch(err) {
    res.json({message: 'Item not added...'});
    }
}

exports.getItemData = async(req, res) => {
    try {
        const id = req.params.id;
        const itemData = await Items.findOne({_id: id});
        res.json({itemData});
} catch(err) {
    res.json({message: 'Item data problem...'});
    }
}

exports.updateItem = async(req, res) => {
    try {
        req.body['actors'] = JSON.parse(req.body.actors);
        req.body['image'] = req.files.image?'http://'+req.headers.host+'/images/'+req.files.image[0].filename:req.body.image;
        const video = req.files.video?'http://'+req.headers.host+'/images/'+req.files.video[0].filename:req.body.video;
        const id = req.params.id;
        const old = await Items.findOne({_id: id});
        const oldVideoObject = old.video;
        oldVideoObject[req.body.episode] = video;
        req.body['video'] = oldVideoObject;
        const update = await Items.update({_id: id}, req.body);
        if(update.nModified===1) {
            res.json({message: 'Item data updated...'});
        }
} catch(err) {
    res.json({message: 'Update item problem.. try again...'});
    }
}

exports.deleteItem = async(req, res) => {
    try {
        const id = req.params.id;
        const delitem = await Items.deleteOne({_id: id});
        if(delitem) {
            res.json({deleted: true});
        }
} catch(err) {
    res.json({message: 'Item didn\'t deleted.. try again...'});
    }
}
exports.findItems = async(req, res) => {
    try {
        const name = req.params.name;
        const items = await Items.find({name});
        if(items.length > 0) {
            res.json({items});
        }
} catch(err) {
    res.json({message: 'Item didn\'t deleted.. try again...'});
    }
}

///////////////////////////////////////////// USERS /////////////////////////////////
exports.getUsers = async(req, res) => {
    try {
        const users = await Users.find();
        res.json({users});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}
exports.deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const deluser = await Users.deleteOne({_id: id});
        console.log(req.body);
        if(deluser) {
            const users = await Users.find();
            res.json({users});
        } else {
            res.json({message: 'Ad not added error happened try again...'});
        }
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}

exports.toggleUserRole = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserRole = await Users.update({_id: id}, {$bit: {role: {xor: 1}}});
        let users = [];
        if(updateUserRole.nModified===1) {
            users = await Users.find();
        }
        res.json({users});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}



////////////////////////////////////// CHATS //////////////////////////////////////////////////
exports.getUsersChats = async(req, res) => {
    try {
        let chats = [];
        chats = await Messages.getMessages();
        res.json({chats});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.getUserChat = async(req, res) => {
    try {
        const email = req.params.email;
        let messages = [];
        messages = await Messages.find({userEmail: email});
        res.json({messages});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

////////////////////////////////////// CARTS //////////////////////////////////////////////////
exports.getUsersCarts = async(req, res) => {
    try {
        let users = [];
        const carts = await Wishlist.find({done: 0});
        const cartsCount = carts.length;
        await carts.forEach(async (cart) => {
            const user = await Users.findOne({_id: cart.userId});
            users.push({user, cart});
            if(users.length === cartsCount) {
                res.json({users});
            }
        });

} catch(err) {
    res.json({message: 'Cart data problem...'});
    }
}

exports.cartStage = async(req, res) => {
    try {
        console.log(req.params);
        const id = req.params.id;
        const stage = req.params.stage;
        const updateObj = {$bit: {[stage]: {xor: 1}}};
        if(stage === 'done') updateObj['date'] = new Date();
        const update = await Wishlist.update({_id: id}, updateObj);
        if(update.nModified === 1) {
            let users = [];
            carts = await Wishlist.find({done: 0});
            const cartsCount = carts.length;
                await carts.forEach(async (cart) => {
                    const user = await Users.findOne({_id: cart.userId});
                    users.push({user, cart});
                    if(users.length === cartsCount) {
                        res.json({users, message: 'delivery step updated...'});
                    }
                });
            return;
        }
        res.json({message: 'user cart stage not updated'});
} catch(err) {
    res.json({message: 'Cart data problem...'});
    }
}
exports.addVisitor = async(req, res) => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const info = await Visitors.find({month, year});
    if(info.length > 0) 
        await Visitors.update({month, year}, {$inc: {visitors: 1}});
    else 
        await new Visitors({month, year, visitors: 1}).save();
}
exports.getVisits = async(req, res) => {
    try {
        const year = new Date().getFullYear();
        const visits = await Visitors.find({year});
        const comments = await Comments.find({date: {$gte: `${new Date().getFullYear()}-01-01 00:00:00`}, date: {$lt: `${new Date().getFullYear()+1}-01-01 00:00:00`}});
        const orders = await Wishlist.find({date: {$gte: `${new Date().getFullYear()}-01-01 00:00:00`}, date: {$lt: `${new Date().getFullYear()+1}-01-01 00:00:00`}});
        res.json({visits, comments, orders});
    } catch(err) {
        res.json({err});
    }
}

exports.verify = async(req, res) => {
    try {
        const admin = await Users.find({role: 1, password: req.params.password});
        console.log(admin);
        if(admin.length>0) res.json({confirm: true})
        else res.json({confirm: false})
    } catch(err) {
        res.json({err});
    }
}
exports.getDashboardData = async(req, res) => {
    try {
        const c1 =  Chars.find().count();
        const u = Users.find().count();
        const c2 = Comments.find().count();
        const c3 = Wishlist.find({done: 0}).count();
        const c4 = await Messages.getMessages();
        const chats = c4.length;
        const a = Ads.find().count();
        const i = Items.find().count();
        const [cats, users, comments, carts, ads, items] = await Promise.all([c1, u, c2, c3, a, i]);
        res.status(200).json({cats, users, comments, carts, chats, ads, items});
    } catch(err) {
        res.json({err});
    }
}


