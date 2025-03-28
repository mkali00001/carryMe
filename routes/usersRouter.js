const express = require('express')
const router = express.Router()
const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let generateToken = require('../utils/generateToken')
let {registerUser, loginUser} = require('../controllers/authController')

router.get('/', (req, res) => {
    res.send('hey users')
})

router.post('/register', registerUser )
router.post('/login', loginUser)

module.exports = router