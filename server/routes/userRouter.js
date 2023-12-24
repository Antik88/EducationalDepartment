const { Router } = require("express");
const router = new Router
const userController = require("../controllers/userController");

router.post('/registration', userController.registration)
router.post('/regNewUser', userController.regNewUser)
router.post('/login', userController.login)
router.get('/auth', userController.ceck)


module.exports = router