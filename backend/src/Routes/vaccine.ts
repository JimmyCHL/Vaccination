import express from 'express'
import { Vaccine } from '../Model'

const vaccineRoute = express.Router({ strict: true, caseSensitive: true })

vaccineRoute.post('/api/addVaccine', (req, res) => {
  const vaccine = new Vaccine(req.body)
  vaccine
    .save()
    .then((vaccine) => {
      res.json(vaccine)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while adding vaccine')
    })
})
vaccineRoute.post('/api/updateVaccine', (req, res) => {
  const { _id, ...rest } = req.body

  Vaccine.findByIdAndUpdate(_id, rest, { new: true })
    .then((_) => {
      Vaccine.find().then((vaccines) => {
        res.json(vaccines)
      })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while updating vaccine')
    })
})
vaccineRoute.delete('/api/deleteVaccine/:id', (req, res) => {
  const { id } = req.params

  Vaccine.findByIdAndDelete(id)
    .then(() => {
      Vaccine.find().then((vaccines) => {
        res.json(vaccines)
      })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while deleting vaccine')
    })
})
vaccineRoute.get('/api/fetchVaccines', (req, res) => {
  Vaccine.find()
    .then((vaccines) => {
      res.json(vaccines)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while fetching vaccines')
    })
})

export { vaccineRoute }
