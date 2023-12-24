const { Event, Invitees, Subdivision, Category, EventInvitees, Organizers, Employee, Student } = require('../models/models')

class EventController {
    async getAll(req, res) {
        const event = await Event.findAll({
            include: [
                { model: Invitees },
                { model: Category, attributes: ['name'], as: 'category' },
                { model: Subdivision, attributes: ['name'], as: 'subdivision' },
                {
                    model: Organizers,
                    include: [
                        { model: Employee },
                        { model: Student }
                    ]
                }
            ]
        });
        return res.json(event);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const event = await Event.findOne({
            where: { id },
            include: [
                {
                    model: Invitees
                },
                {
                    model: Category,
                    attributes: ['name'],
                    as: 'category'
                },
                {
                    model: Subdivision,
                    attributes: ['name'],
                    as: 'subdivision'
                },
                {
                    model: Organizers,
                    include: [
                        { model: Employee },
                        { model: Student }
                    ]
                }
            ]
        });
        return res.json(event);
    }

    async getAllBySubdivisions(req, res) {
        const { subdivisions } = req.query;

        try {
            const events = await Event.findAll({
                include: [
                    { model: Invitees },
                    { model: Category, attributes: ['name'], as: 'category' },
                    { model: Subdivision, attributes: ['name'], as: 'subdivision' },
                    {
                        model: Organizers,
                        include: [
                            { model: Employee },
                            { model: Student }
                        ]
                    }
                ],
                where: {
                    '$subdivision.id$': subdivisions
                }
            });

            return res.json(events);
        } catch (error) {
            console.error("Ошибка при получении событий:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async create(req, res) {
        const { name } = req.body
        const { subdivision_id } = req.body
        const { category_id } = req.body
        const { planned_result } = req.body
        const { invitees_id } = req.body
        const { deadline } = req.body
        const { completion_status } = req.body
        const { note } = req.body

        const event = await Event.create({
            name, subdivision_id,
            category_id, planned_result,
            invitees_id, deadline, completion_status, note
        })

        const { invited } = req.body

        invited.map(async (person_id) => {
            await EventInvitees.create({
                event_id: event.id,
                InviteeId: person_id
            });
        });

        const { organize } = req.body

        organize.employeers.map(async (student_id) => {
            await Organizers.create({
                student_id: student_id,
                event_id: event.id
            })
        });

        organize.student.map(async (employee_id) => {
            await Organizers.create({
                employee_id: employee_id,
                event_id: event.id
            })
        });

        return res.json(event)
    }
}

module.exports = new EventController()