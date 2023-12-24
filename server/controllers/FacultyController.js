const { Faculty } = require('../models/models')
const ApiError = require('../error/ApiError')

class EventInviteesController {
    async create(req, res) {
        const { name } = req.body
        const faculty = await Faculty.create({ name })
        return res.json(faculty)
    }

    async getAllById(req, res) {
    }

    async getAll(req, res) {
        const facyltis = await Faculty.findAll()
        return res.json(facyltis)
    }
}

module.exports = new EventInviteesController()