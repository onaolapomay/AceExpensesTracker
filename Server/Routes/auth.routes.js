const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' })
})

router.post('/signup', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    })
  }

  res.status(201).json({
    message: 'Signup successful',
    user: {
      email,
    },
  })
})

module.exports = router