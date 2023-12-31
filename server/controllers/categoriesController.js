const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoriesController {
    async create(req, res) {
        const { name } = req.body
        const category = await Category.create({ name })
        return res.json(category)
    }

    async getAllById(req, res) {
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoriesController()