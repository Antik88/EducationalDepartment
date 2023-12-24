const { Violation, Student } = require('../models/models')
const ApiError = require('../error/ApiError')

class OffensesController {
    async createWStudent(req, res) {
        const { full_name, group_name,
            article, date_committed,
            court_decision, penalty} = req.body 

        const student = await Student.create({ full_name, group_name })
        const student_id = student.id

        const violation = await Violation.create({
            student_id: student_id, article: article,
            date_committed: date_committed, court_decision: court_decision,
            penalty: penalty
        })

        return res.json(violation)
    }

    async getOne(req, res) {
        const { id } = req.params
        const result = await Violation.findOne({
            where: { id },
            include: [
                { model: Student, foreignKey: 'student_id', as: 'student' }
            ]
        })
        return res.json(result)
    }

    async getAll(req, res) {
        const result = await Violation.findAll({
            include: [
                { model: Student, foreignKey: 'student_id', as: 'student' }
            ]
        });
        return res.json(result);
    }
}

module.exports = new OffensesController()