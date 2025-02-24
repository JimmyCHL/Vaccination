import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import './src/Model'

// Load environment variables
dotenv.config()

// Create an express app
const app = express()

// Config
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
  })
)

app.use('/static', express.static('public/resources'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// jwt
// Middleware to protect routes
const authenticateJWT = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
  if (req.path === '/api/authenticate') return next()

  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) res.status(401).json({ message: 'Access denied' })
  else {
    jwt.verify(token, process.env.JWT_SECRET || 'Secret', (err, user) => {
      console.log('Error:', err)
      if (err) return res.status(403).json({ message: 'Invalid token' })
      console.log('User:', user)
      next()
    })
  }
}

export { app, authenticateJWT, jwt }
