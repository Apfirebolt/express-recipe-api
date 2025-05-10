import asyncHandler from 'express-async-handler'
import Ingredient from '../models/Ingredient.js'
import Recipe from '../models/Recipe.js'

// @desc    Auth user & get token
// @route   POST /api/ingredients
// @access  Private

const addIngredient = asyncHandler(async (req, res) => {
  const { recipe, name, quantity } = req.body

  if (!recipe || !name) {
    res.status(400)
    throw new Error('Recipe and name fields are required')
  }

  const relatedRecipe = await Recipe.findOne({ _id: recipe })

  // Check if recipe owner is the logged in user
  if (relatedRecipe.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized to add ingredient')
  }

  const ingredient = await Ingredient.create({
    recipe,
    name,
    quantity
  })

  if (ingredient) {
    res.status(201).json({
      _id: ingredient._id,
      name: ingredient.name,
      quantity: ingredient.quantity
    })
  } else {
    res.status(400)
    throw new Error('Invalid ingredient data')
  }
})

// @desc    Get all ingredients
// @route   GET /api/ingredients
// @access  Public
const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({})
    res.json(ingredients)
})

// @desc    Get user by ID
// @route   GET /api/Ingredients/:id
// @access  Public
const getIngredientById = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id)

  if (ingredient) {
    res.json(ingredient)
  } else {
    res.status(404)
    throw new Error('Ingredient not found')
  }
})

// @desc    Update a single ingredient
// @route   PUT /api/ingredients/id
// @access  Private
const updateIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id})
    if (ingredient) {
      const relatedRecipe = await Recipe.findOne({ _id: ingredient.recipe })

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized to update ingredient')
      }

      ingredient.name = req.body.name || ingredient.name
      ingredient.quantity = req.body.quantity || ingredient.quantity
  
      const updatedIngredient = await ingredient.save()
      res.json({
        message: 'Ingredient data updated successfully',
        data: updatedIngredient
      })
    } else {
      res.status(404)
      throw new Error('Ingredient not found')
    }
  })
  
  // @desc    Delete a single ingredient
  // @route   DELETE /api/ingredients/id
  // @access  Private
  const deleteIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id})
    if (ingredient) {
      const relatedRecipe = await Recipe.findOne({ _id: ingredient.recipe })

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized to delete ingredient')
      }

      await ingredient.deleteOne();

      res.status(204).send();
    } else {
      res.status(404)
      throw new Error('Ingredient not found')
    }
  })

export {
  addIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,  
  deleteIngredient
}
