const mongoose = require('mongoose');

const theSchema = mongoose.Schema;

const favoriteSchema = new theSchema({
   
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'

    }], 
},
{
    timestamps: true,
});

const favorites = mongoose.model('favorites', favoriteSchema);

module.exports = favorites;