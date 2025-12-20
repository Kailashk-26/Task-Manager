import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.ts'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

await connectDB()

app.get('/', (_req, res) => {
  res.send('server is live')
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
