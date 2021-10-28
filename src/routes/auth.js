const express = require('express');
const router = express.Router();
const authController = require("../app/controllers/auth.controller");

router.post('/register', authController.register);

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', authController.login, (req, res) => {
    return res.redirect('/home');
});

module.exports = router;
