import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/Error.js'
import connectDB from './config/db.js'

import userRoutes from './routes/UserRoutes.js'
import recipeRoutes from './routes/RecipeRoutes.js'
import ingredientRoutes from './routes/IngredientRoutes.js'
import stepRoutes from './routes/StepRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/steps', stepRoutes)
app.use('/api/ingredients', ingredientRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.sendFile('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
