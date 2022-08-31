import asyncHandler from 'express-async-handler'
import Step from '../models/Step.js'
import Recipe from '../models/Recipe.js'

// @desc    Auth user & get token
// @route   POST /api/steps
// @access  Private

const addStep = asyncHandler(async (req, res) => {
  const { recipe, description } = req.body

  if (!recipe || !description) {
    res.status(400)
    throw new Error('Recipe and description fields are required')
  }

  const relatedRecipe = await Recipe.findOne({ _id: recipe })

  // Check if recipe owner is the logged in user
  if (relatedRecipe.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized to add step')
  }

  const step = await Step.create({
    recipe,
    description,
  })

  if (step) {
    res.status(201).json({
      _id: step._id,
      description: step.description,
      recipe: step.recipe
    })
  } else {
    res.status(400)
    throw new Error('Invalid step data')
  }
})

// @desc    Get all steps
// @route   GET /api/steps
// @access  Public
const getSteps = asyncHandler(async (req, res) => {
    const steps = await Step.find({})
    res.json(steps)
})


// @desc    Get user by ID
// @route   GET /api/steps/:id
// @access  Public
const getStepById = asyncHandler(async (req, res) => {
  const step = await Step.findById(req.params.id)

  if (step) {
    res.json(step)
  } else {
    res.status(404)
    throw new Error('Step not found')
  }
})

// @desc    Update a single step
// @route   PUT /api/steps/id
// @access  Private
const updateStep = asyncHandler(async (req, res) => {
    const step = await Step.findOne({ _id: req.params.id})
    if (step) {
      const relatedRecipe = await Recipe.findOne({ _id: step.recipe })

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized to update step')
      }

      step.description = req.body.description || step.description
  
      const updatedStep = await step.save()
      res.json({
        message: 'Step data updated successfully',
        data: updatedStep
      })
    } else {
      res.status(404)
      throw new Error('Step not found')
    }
  })
  
  // @desc    Delete a single step
  // @route   DELETE /api/steps/id
  // @access  Private
  const deleteStep = asyncHandler(async (req, res) => {
    const step = await Step.findOne({user: req.user._id, _id: req.params.id})
    if (step) {
      const relatedRecipe = await Recipe.findOne({ _id: step.recipe })

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized to delete step')
      }

      await step.remove();
  
      res.json({
        message: 'Step removed'
      })
    } else {
      res.status(404)
      throw new Error('Step not found')
    }
  })

export {
  addStep,
  getSteps,
  getStepById,
  updateStep,  
  deleteStep
}
