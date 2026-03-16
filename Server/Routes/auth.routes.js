const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../Models/users')
const { generateToken } = require('../utils/jwt')
const auth = require('../Middlewares/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/update-email', auth, async (req, res) => {
  try {

    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email },
      { new: true }
    ).select('-password')

    res.status(200).json({ user })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/change-password', auth, async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id)

    const isMatched = await bcrypt.compare(currentPassword, user.password)

    if (!isMatched) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword

    await user.save()

    res.status(200).json({ message: 'Password updated successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }

})

module.exports = router