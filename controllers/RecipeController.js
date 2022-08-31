import asyncHandler from 'express-async-handler'
import Recipe from '../models/Recipe.js'
import Step from '../models/Step.js'
import Ingredient from '../models/Ingredient.js'
import Picture from '../models/Picture.js'

// @desc    Auth user & get token
// @route   POST /api/recipes
// @access  Private

const addRecipe = asyncHandler(async (req, res) => {
  const { title } = req.body

  const recipeExists = await Recipe.findOne({ title, user: req.user._id })

  if (recipeExists) {
    res.status(400)
    throw new Error('Recipe already exists')
  }

  if (!title) {
    res.status(400)
    throw new Error('Please add a recipe title')
  }

  const recipe = await Recipe.create({
    title,
    user: req.user._id
  })

  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      title: recipe.title,
    })
  } else {
    res.status(400)
    throw new Error('Invalid recipe data')
  }
})

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({})
    res.json(recipes)
})



// @desc    Get user by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (recipe) {
    const ingredients = await Ingredient.find({ recipe: recipe._id })
    const steps = await Step.find({ recipe: recipe._id })
    const pictures = await Picture.find({ recipe: recipe._id })
    const data = {
      title: recipe.title,
      ingredients,
      steps,
      pictures
    }
    res.json(data)
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

// @desc    Update a single recipe
// @route   PUT /api/recipes/id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({createdBy: req.user._id, _id: req.params.id})
    if (recipe) {
      recipe.title = req.body.title || recipe.title
  
      const updatedRecipe = await recipe.save()
      res.json({
        message: 'Recipe data updated successfully',
        data: updatedRecipe
      })
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  })
  
  // @desc    Delete a single recipe
  // @route   DELETE /api/recipes/id
  // @access  Private
  const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({user: req.user._id, _id: req.params.id})
    if (recipe) {
      await recipe.remove();
  
      res.json({
        message: 'Recipe removed'
      })
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  })

export {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,  
  deleteRecipe
}
