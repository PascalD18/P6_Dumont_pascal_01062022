const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}
);

// Plugin pour éviter de créer un utilisateur en double
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);