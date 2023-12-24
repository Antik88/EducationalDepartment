const { Employee } = require('../models/models')
const ApiError = require('../error/ApiError')

class EmployeeController {
    async create(req, res) {
        const { name, group_number } = req.body
        const employee = await Employee.create({ name, group_number })
        return res.json(employee)
    }

    async getAllById(req, res) {
    }

    async getAll(req, res) {
        const employes = await Employee.findAll()
        return res.json(employes)
    }
}

module.exports = new EmployeeController()