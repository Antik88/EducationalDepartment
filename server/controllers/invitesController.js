const { Invitees } = require('../models/models')
const ApiError = require('../error/ApiError')

class InvitesController {
    async create(req, res) {
        const { full_name, position, organization } = req.body
        const invite = await Invitees.create({ full_name, position, organization })
        return res.json(invite)
    }

    async getOneById(req, res) {
        const {id} = req.params
        const invite = await Invitees.findByPk(id)
        return res.json(invite)
    }

    async getAll(req, res) {
        let result
        result = await Invitees.findAll()
        return res.json(result)
    }
}

module.exports = new InvitesController()