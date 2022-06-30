const mongoose = require('mongoose');
const SauceSchema = mongoose.Schema({
    name: { type: String, require: true },
    manufacture: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: false},
    heat: { type: Number, require: true, default:0 },
    likes: { type: Number, require: true ,default:0},
    dislikes: { type: Number, require: true ,default:0},
    usersLiked: { type: [String], require: true,default:[] },
    usersDisliked: { type: [String], require: true,default:[] },
});

module.exports = mongoose.model('Sauce', SauceSchema);
