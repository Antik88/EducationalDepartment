const { Router } = require("express");
const FacultyController = require('../controllers/FacultyController')
const router = new Router

router.post('/create', FacultyController.create)
router.get('/all', FacultyController.getAll)
router.get('/:id')


module.exports = router