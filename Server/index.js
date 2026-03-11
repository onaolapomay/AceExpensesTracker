require('dotenv').config()

const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')
const protectedRoutes = require('./Routes/protected.routes')
const expenseRoutes = require('./Routes/expenses.routes')

const authRoutes = require('./Routes/auth.routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [ 'http://localhost:5173',
    'https://expensesrack.netlify.app'
  ],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', authRoutes)

app.use('/api', protectedRoutes)

app.use('/api', expenseRoutes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})