const router = require('express').Router();
const recipeService = require('../services/recipeService.js');
let Recipe = require('../models/recipe.model');
let Favorite = require('../models/favorites.model');

router.route('/favorites/:name').get(async (req, res, next) => {
    try {
        let isFave = await recipeService.isFavorite(req.params.name);
        return res.status(200).json({data: isFave});
    } catch (error) {
        next(error);
    }
});

router.route('/favorites/:name').delete(async (req, res, next) => {
    try {
        let deletedRecipe = await recipeService.deleteFavorite(req.params.name);
        return res.status(200).json({data: deletedRecipe});
    } catch (error) {
        next(error);
    }
});

router.route('/favorites').get(async (req, res, next) => {
    try {
        let recipes = await recipeService.getFavorites(req.body);
        return res.json(recipes);
    } catch (error) {
        next(error);
    }
});

router.route('/favorites/:recipeId').post(async (req, res, next) => {
    try {
        let newFavorite = await recipeService.addFavorite(req.params.recipeId);
        return res.status(200).json({Favorite: newFavorite});
    } catch (error) {
        next(error);
    }
});

router.route('/recipes').post(async (req, res, next) => {
    try {
        let newRecipe = await recipeService.addRecipe(req.body);
        return res.status(200).json({Recipe: newRecipe});
    } catch (error) {
        next(error);
    }
});

router.route('/recipe/update').post(async (req, res, next) => {
    try {
        let updatedRecipe = await recipeService.addIngredient(req.body);
        return res.status(200).json({Recipe: updatedRecipe});
    } catch (error) {
        next(error);
    }
});

router.route('/recipeSearch').post(async (req, res, next) => {
    try {
        let recipeList = await recipeService.getRecipes(req.body);
        return res.json(recipeList);
    } catch (error) {
        next(error);
    }
});

router.route('/possibleRecipes/:searchTerm').get(async (req, res, next) => {
    try {
        let recipes = await recipeService.getRecipesToDisplay(req.params.searchTerm);
        return res.json(recipes);
    } catch (error) {
        next(error);
    }
});

router.route('/recipeDisplay/:name').get(async (req, res, next) => {
    try {
        let recipe = await recipeService.getRecipeDisplay(req.params.name);
        return res.json(recipe);
    } catch (error) {
        next(error);
    }
});


module.exports = router;