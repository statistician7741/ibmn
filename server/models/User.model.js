var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nama: {
        type: String,
        default: 'User'
    },
    username: String,
    password: String,
    isAdmin: {
        default: false,
        type: Boolean
    },
    menus: [String]
}, { collection: 'bmn_kolaka_user' });

module.exports = mongoose.model('User', UserSchema);