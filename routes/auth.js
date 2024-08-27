const express = require('express');
const app = express();
const router = express.Router();
const login = require('../controller/auth/login')
const signup = require('../controller/auth/signup')


router.route('/login').post(login)
router.route('/signup').put(signup);

module.exports = router;