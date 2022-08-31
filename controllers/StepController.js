import asyncHandler from 'express-async-handler'
import Step from '../models/Step.js'

// @desc    Auth user & get token
// @route   POST /api/steps
// @access  Private

const addStep = asyncHandler(async (req, res) => {
  const { title } = req.body

  const recipeExists = await Step.findOne({ title, user: req.user._id })

  if (recipeExists) {
    res.status(400)
    throw new Error('Step already exists')
  }

  if (!title) {
    res.status(400)
    throw new Error('Please add a step title')
  }

  const step = await Step.create({
    title,
    user: req.user._id
  })

  if (step) {
    res.status(201).json({
      _id: step._id,
      title: step.title,
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
    const step = await Step.findOne({createdBy: req.user._id, _id: req.params.id})
    if (step) {
      step.title = req.body.title || step.title
  
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
