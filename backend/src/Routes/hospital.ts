import express from 'express'
import { Hospital } from '../Model'

const hospitalRoute = express.Router({ strict: true, caseSensitive: true })

hospitalRoute.post('/api/addHospital', (req, res) => {
  const hospital = new Hospital(req.body)
  hospital
    .save()
    .then((hospital) => {
      res.json(hospital)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while adding hospital')
    })
})

hospitalRoute.post('/api/updateHospital', (req, res) => {
  const { _id, ...rest } = req.body

  Hospital.findByIdAndUpdate(_id, rest, { new: true })
    .then((_) => {
      Hospital.find().then((hospitals) => {
        res.json(hospitals)
      })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while updating hospital')
    })
})

hospitalRoute.delete('/api/deleteHospital/:id', (req, res) => {
  const { id } = req.params

  Hospital.findByIdAndDelete(id)
    .then(() => {
      Hospital.find().then((hospitals) => {
        res.json(hospitals)
      })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while deleting hospital')
    })
})

hospitalRoute.get('/api/fetchHospitals', (req, res) => {
  Hospital.find()
    .then((hospitals) => {
      res.json(hospitals)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while fetching hospitals')
    })
})

export { hospitalRoute }
