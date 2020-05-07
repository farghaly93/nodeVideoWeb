const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Messages = require('../models/messages');
const jwt = require('jsonwebtoken');

exports.signin = async(req, res) => {
    try {
        const body = req.body;
        const user = await Users.findOne({email: body.email});
        if(user) {
            const matched = bcrypt.compareSync(body.password, user.password);
            if(matched) {
                let CONFIG_SECRET = "mohammadFarghalyAliSaadawy";
                if(user.role === 1) CONFIG_SECRET = 'mohammadFarghalyAliSaadawyAdmin';
                const token = jwt.sign({email: 'user.email'}, CONFIG_SECRET, {expiresIn: 8000000});
                res.status(200).json({done: true, token, email: user.email, role: user.role, userId: user._id});
            } else {
                throw({message: 'password is incorrect...'});
            }
        } else {
            throw({message: 'Email is incorrect...'});
        }
    } catch(err) {
        res.json({message: err.message});
    }
}

exports.signup = async(req, res) => {
    try {
        const body = req.body;
        const hashed = bcrypt.hashSync(body.password, 10);
        body.password = hashed
        const newUser = await new Users(body).save();
        const token = jwt.sign({email: newUser.email}, 'mohammadFarghalyAliSaadawy', {expiresIn: 80000});
        if(newUser) {res.status(200).json({done: true, token, email: newUser.email, role: newUser.role, userId: newUser._id})}
        else {throw({message: 'sign up failed...'})};
    } catch(err) {
        const message = err.driver?'this email is already exist': err.message;
        res.json({message});
    }
}
exports.updateuserdata = async(req, res) => {
    req.body.data.password = bcrypt.hashSync(req.body.data.password, 10);
    const updateuser = await Users.update({_id: req.body.userId}, req.body.data);
    if(updateuser.nModified===1) {
        res.json({updated: true});
        return;
    }
    res.json({updated: false});
}
exports.getuserdata = async(req, res) => {
    const userdata = await Users.find(req.body);
    console.log(userdata[0]);
    res.status(200).json({userdata: userdata[0]});
}
exports.getmessages = async(req, res) => {
    const messages = await Messages.find({userEmail: req.params.userEmail});
    res.json({messages});
}