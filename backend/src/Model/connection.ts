//create schema to start with
import mongoose from 'mongoose'

//creates db with name vaccination or opens a connection if already present
mongoose.connect('mongodb://localhost:27017/vaccination').then(() => {
  console.log('Connected to MongoDB')
})

export default mongoose
