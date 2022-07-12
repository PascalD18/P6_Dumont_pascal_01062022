const mongoose = require('mongoose');

 const SauceSchema = mongoose.Schema({
//const Sauce = mongoose.model(
//    "Nouvelle_Base",
 //   {
        userId: { type: String, require: true },
        name: { type: String, require: true },
        manufacturer: { type: String, require: true },
        description: { type: String, require: true },
        mainPepper: { type: String, require: true },
        imageUrl: { type: String, require: false },
        heat: { type: Number, require: true, default: 1 },
        likes: { type: Number, require: true, default: 0 },
        dislikes: { type: Number, require: true, default: 0 },
        usersLiked: { type: [String], require: true, default: [] },
        usersDisliked: { type: [String], require: true, default: [] },
    }//,
 //   "Essai5"
)

//});

module.exports = mongoose.model('Sauce', SauceSchema);
//module.exports = Sauce;