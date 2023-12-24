const { Router } = require("express");
const eventController = require("../controllers/eventController");
const router = new Router

router.post('/create', eventController.create)
router.get('/all', eventController.getAll)
router.get('/:id', eventController.getOne)
router.get('/params/subdiv', eventController.getAllBySubdivisions)

module.exports = router
