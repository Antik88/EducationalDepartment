const { Router } = require("express");
const CategoriesController = require('../controllers/categoriesController')
const router = new Router

router.post('/create', CategoriesController.create)
router.get('/all', CategoriesController.getAll)
router.get('/:id', CategoriesController.getAllById)


module.exports = router