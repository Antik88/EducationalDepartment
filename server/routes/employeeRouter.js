const { Router } = require("express");
const EmployeeController = require('../controllers/employeeController')
const router = new Router

router.post('/create', EmployeeController.create)
router.get('/all', EmployeeController.getAll)
router.get('/:id', EmployeeController.getAllById)


module.exports = router