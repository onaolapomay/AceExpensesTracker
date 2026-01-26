process.env.JWT_SECRET = 'super_secret_key_change_later'

const express = require('express')
const cors = require('cors')
const protectedRoutes = require('./Routes/protected.routes')

const authRoutes = require('./Routes/auth.routes')

const app = express()
const PORT = 5000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', authRoutes)

app.use('/api', protectedRoutes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})