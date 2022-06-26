const mongoose = require('mongoose');
const thingSchema = mongoose.Schema({
    name: { type: String, require: true },
    manufacture: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    usersLiked: { type: Number, require: true },
    usersDisliked: { type: Number, require: true },
});

module.exports = mongoose.model('Thing', thingSchema);
