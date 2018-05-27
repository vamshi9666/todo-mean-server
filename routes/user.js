const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user')

router.post('/register',userController.add_user);
router.post('/login',userController.login_user)

module.exports = router;