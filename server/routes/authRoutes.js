const express = require('express')
const router = express.Router();
const cors = require("cors");


const {registerUser, loginUser, auth, logout} = require('../controllers/authController')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout)
router.get('/auth', auth)


module.exports =router;