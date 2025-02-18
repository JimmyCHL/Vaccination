import express, { Request, Response } from 'express'
import './src/Model'

const app = express()
const port = 9000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
