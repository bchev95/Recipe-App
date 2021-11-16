const mongoose = require('mongoose');

const theSchema = mongoose.Schema;

const recipeSchema = new theSchema({
   
    name: {
        type: String
    },
    searchTerm: {
        type: String
    },
    ingredients: [{
        type: String,
        ref: 'ingredient'

    }], 
    cookingTime: {
        type: Number
    },
    instructions: {
        type: String
    }
},
{
    timestamps: true,
});

const recipes = mongoose.model('recipes', recipeSchema);

module.exports = recipes;