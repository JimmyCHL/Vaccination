import express from 'express'
import { app, authenticateJWT } from './config'
import { hospitalRoute, scheduleRoute, userRoute, vaccineRoute } from './src/Routes'

const hospitalApp = express()
const vaccineApp = express()
const userApp = express()
const scheduleApp = express()

// Mount the routes
hospitalApp.use('/', authenticateJWT, hospitalRoute)
vaccineApp.use('/', authenticateJWT, vaccineRoute)
userApp.use('/', authenticateJWT, userRoute)
scheduleApp.use('/', authenticateJWT, scheduleRoute)

// Mount the apps
app.use('/hospital', hospitalApp)
app.use('/vaccine', vaccineApp)
app.use('/user', userApp)
app.use('/schedule', scheduleApp)

app.get('*', function (_, res) {
  res.send('404 Page Not Found - API is not ready yet')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})
