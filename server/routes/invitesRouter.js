const { Router } = require("express");
const invitesController = require("../controllers/invitesController");
const router = new Router

router.post('/create', invitesController.create)
router.get('/all', invitesController.getAll)
router.get('/one/:id', invitesController.getOneById)

module.exports = router