const express = require('express')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const router = express.Router()



const usersFilePath = path.join(__dirname, '../data/users.json')



function readUsers() {
  if (!fs.existsSync(usersFilePath)) {
    return []
  }
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  return JSON.parse(data)
}



function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}



router.post('/register', (req, res) => {
  const { email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    })
  }

  const users = readUsers()

  const existingUser = users.find(user => user.email === email)
  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists',
    })
  }

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
  }

  users.push(newUser)
  writeUsers(users)

  return res.status(201).json({
    message: 'User registered successfully',
  })
})



router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    })
  }

  const users = readUsers()

  const user = users.find(user => user.email === email)

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const isMatched = bcrypt.compareSync(password, user.password)

  if (!isMatched) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
    },
  })
})

module.exports = router