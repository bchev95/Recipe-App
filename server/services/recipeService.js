const Recipe = require('../models/recipe.model');
const Favorite = require('../models/favorites.model');


/**
 * addRecipe - Backend Helper Method
 * This method can be used to add a recipe to the database. Will not be available to user, this is for building our database of recipes
 * @method addRecipe
 * @param {reqInfo} reqInfo - recipe name (name), ingredients (ingredients[]), cooking time (cookingTime), and recipe instructions (instructions)
 * @returns {savedRecipe} - the recipe
 */

const addRecipe = async (reqInfo) => {
    let name = reqInfo.name
    let ingredients = reqInfo.ingredients
    let searchTerm = reqInfo.searchTerm
    let cookingTime = reqInfo.cookingTime
    let instructions = reqInfo.instructions
    var newRecipe = new Recipe({name, searchTerm, ingredients, cookingTime, instructions});
    const savedRecipe = newRecipe.save();
    return savedRecipe;
};

/**
 * getRecipes - Service Method
 * This method can be used to add a recipe to the database. Will not be available to user, this is for building our database of recipes
 * @method getRecipes
 * @param {reqInfo} reqInfo - searchTerm - the main ingredient to search for
 * @returns {recipesList}} - Array of recipes returned matching searchTerm
 */
const getRecipes = async (reqInfo) => {
    var recipesList = [];
    for(i = 0; i < 4; i++)
    {
        var theRecipe = await Recipe.findOne({searchTerm: reqInfo.searchTerm});
        recipesList.push(theRecipe);
    }
    return recipesList;
}

/**
 * getFavorites - Service Method
 * This method is used to retrieve the list of favorite recipes that the user has
 * @method getFavorites
 * @param {reqInfo} reqInfo - No parameters necessary because all favorites are in one object
 * @returns {favoritesList} - An array of recipe objects
 */

const getFavorites = async (reqInfo) => {
    /*Since there are no separate "users" we are keeping track of, the favorites collection in the database contains the 
    favorites of our one single user. Just return all the recipes in this collection */
    var theFave = await Favorite.findOne({_id: "5e9cca5875fe32369886c6dd"});
    /*Now that we have the favorite object, we need to find the Recipe objects corresponding to the object IDs stored
    within the recipes[] array. We want to return an array of these Recipe objects*/
    var recipeIDs = theFave.recipes;
    var favoritesList = [];
    for(i = 0; i < recipeIDs.length; i++)
    {
        var theRecipe = await Recipe.findOne({_id: recipeIDs[i]});
        //console.log("recipeID: " + theRecipe.id);
        favoritesList.push(theRecipe);
    }
    var flattenedFavoritesList = [].concat.apply([], favoritesList);
    return flattenedFavoritesList;
};

/**
 * addFavorite - Service Method
 * This method is used to add a recipe to the user's favorites
 * @method addFavorite
 * @param {reqInfo} reqInfo - contains the object ID of the recipe to be added (recipeId)
 * @returns {addRecipeToFaves} - updated favorites list
 */

const addFavorite = async (recipeId) => {
    //recipe "recipeId" is given in the request body from front-end
    //Next retrieve the recipe object with this name
    const newRecipe = await Recipe.findOne({_id: recipeId});
    //Now add the object ID of the recipe object to the recipes[] array within the favorites object
    const addRecipeToFaves = await Favorite.findOneAndUpdate(
        {_id: "5e9cca5875fe32369886c6dd"},
        {$addToSet: {recipes: newRecipe._id}}, {new: true}
    );
    return addRecipeToFaves;
};

/**
 * deleteFavorite - Service Method
 * This method is used to remove a recipe from the user's favorites
 * @method deleteFavorite
 * @param {reqInfo} reqInfo - contains the name of the recipe to be removed (name)
 * @returns {removeFromFaves} - updated favorites list
 */
const deleteFavorite = async (reqInfo) => {
    console.log("in deleteFave, reqInfo is: " + reqInfo);
    //recipe "name" is given in the request body from front-end
    //Next retrieve the recipe object with this name
    const theRecipe = await Recipe.findOne({name: reqInfo});
    //Now remove the object ID of the recipe object from the recipes[] array within the favorites object
    const removeFromFaves = await Favorite.findOneAndUpdate(
        {_id: "5e9cca5875fe32369886c6dd"},
        {$pull: {recipes: theRecipe._id}}, {new: true}
    );
    return removeFromFaves;
};


/**
 * addIngredient - Helper Method (Not available to user)
 * This method is used to remove a recipe to the user's favorites
 * @method addIngredient
 * @param {reqInfo} reqInfo - contains the name of the recipe to be updated (name) and the ingredient to add (ingredient)
 * @returns {updatedRecipe} - updated recipe object
 */
const addIngredient = async (reqInfo) => {
    const theRecipe = await Recipe.findOneAndUpdate(
        {name: reqInfo.name},
        {$addToSet: {ingredients: reqInfo.ingredient}}, {new: true}
    );
    return theRecipe;
};

const getRecipesToDisplay = async (searchTerm) => {
    //input array of filtered objects here and push to displayList
   /* var theRecipe = await Recipe.findOne({'name': "Mashed Potatoes"});
    var theRecipe2 = await Recipe.findOne({'name': "French Fries"});
    var theRecipe3 = await Recipe.findOne({'name': "Garlic Roasted Potatoes"});

    var displayList =[];
    displayList.push(theRecipe);
    displayList.push(theRecipe2);
    displayList.push(theRecipe3);
    
    return [].concat.apply([], displayList);*/
    //console.log("searchTerm is: " + searchTerm);
    var recipeList = await Recipe.find({searchTerm: searchTerm});
    return recipeList;
};

const getRecipeDisplay = async (name) => {
    //input array of filtered objects here and push to displayList
    /*var theRecipe = await Recipe.findOne({'name': "Mashed Potatoes"});*/
    console.log("name is: " + name);
    var theRecipe = await Recipe.findOne({name: name});
    var displayList =[];
    displayList.push(theRecipe);
    return [].concat.apply([], displayList);
};

const isFavorite = async (name) => {
   var isFave = false;
   var theFave = await Favorite.findOne({_id: "5e9cca5875fe32369886c6dd"});
   var recipeIDs = theFave.recipes;
   var favoritesList = [];
   for(i = 0; i < recipeIDs.length; i++)
   {
       var theRecipe = await Recipe.findOne({_id: recipeIDs[i]});
       favoritesList.push(theRecipe);
   }
   for(i = 0; i < favoritesList.length; i++)
   {
       if(favoritesList[i].name == name)
       {
           isFave = true;
       }
   }
   return isFave;
};

module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite,
    addRecipe,
    addIngredient,
    getRecipes,
    getRecipesToDisplay,
    getRecipeDisplay,
    isFavorite
}