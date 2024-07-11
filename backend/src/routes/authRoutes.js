const express = require('express');
const router = express.Router();
const { login, setupPassword, logout } = require('../controllers/authController');

router.post('/login', login);
router.post('/setup-password', setupPassword);
router.post('/logout', logout);

module.exports = router;