const express = require('express');
const { registerUser, loginUser,googleLoginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLoginUser);

module.exports = router;
