const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    addresses: {
        bitcoin: {type: String },
        bitcoinTestnet: {type: String},
        ether: {type: String }
    }
})

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'index' });
module.exports = mongoose.model('User', UserSchema)