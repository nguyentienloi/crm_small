const Sequelize = require('sequelize');
const models = require('../../../database/models');
const { appointmentStatus } = require('../../components/appointments/appointmentConstant');

const { Op } = Sequelize;

export async function getAllAppointments(beforeMinutes) {
    const minutes = beforeMinutes || 5;
    let whereConditions = {
        [Op.and]: [
            Sequelize.literal(`DATE_ADD(date, INTERVAL -${minutes} MINUTE) <= NOW()`),
            Sequelize.literal('date > NOW()'),
        ],
        status: {
            [Op.eq]: appointmentStatus.PLANNING,
        },
    };
    if (minutes === 15) {
        const limit10 = 10;
        whereConditions = {
            [Op.and]: [
                Sequelize.literal(`DATE_ADD(date, INTERVAL -${minutes} MINUTE) <= NOW()`),
                Sequelize.literal(`DATE_ADD(date, INTERVAL -${limit10} MINUTE) >= NOW()`),
            ],
            status: {
                [Op.eq]: appointmentStatus.PLANNING,
            },
        };
    }
    const notifications = await models.Appointment.findAll({
        attributes: ['id', 'userId', 'mobile', 'customerId', 'date', 'status', 'description'],
        include: [{
            model: models.User,
            as: 'user',
            attributes: ['id', 'username', 'lastName', 'firstName'],
        }],
        where: whereConditions,
        group: [
            'date',
            'userId',
        ],
        order: [['date', 'asc']],
        raw: true,
    });
    return notifications;
}
