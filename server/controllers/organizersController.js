const { Organizers } = require("../models/models");

class OrganizersController {
    async getAll(req, res) {
    }

    async getOne(req, res) {
    }

    async create(req, res) {
        const { employee_id, student_id, faculty_id, event_id } = req.body
        const organization = await Organizers.create({
            employee_id, student_id, faculty_id, event_id 
        })
        return res.json(organization)
    }
}

module.exports = new OrganizersController()