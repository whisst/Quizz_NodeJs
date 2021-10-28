const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: false, unique: true},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    refreshToken: { type: String}
}, {collection: 'users'});

module.exports = mongoose.model('UserSchema', UserSchema);
