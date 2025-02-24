import console from 'console'
import express from 'express'
import { jwt } from '../../config'
import { User } from '../Model'

const userRoute = express.Router({ strict: true, caseSensitive: true })

userRoute.post('/api/authenticate', (req, res) => {
  const { firstName, lastName, email, password } = req.body

  console.log({ firstName, lastName, email, password })

  User.findOne({ email }).then(async (existingUser) => {
    if (existingUser && existingUser.password !== password) {
      return res.json('Error while fetching existing user')
    }

    let localUser = existingUser

    if (!localUser) {
      const newUser = new User(req.body)
      await newUser
        .save()
        .then((user) => {
          localUser = user
        })
        .catch((error) => {
          console.log(error)
          res.json('error while sign up')
        })
    }

    // Create a JWT token (should convert Mongodb object to plain object)
    const token = jwt.sign(localUser!.toJSON(), process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    })

    res.send({
      user: localUser,
      token,
    })
  })
})

export { userRoute }
