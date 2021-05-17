import moment from 'moment';

const Sequelize = require('sequelize');

const { Op } = Sequelize;
const models = require('../../database/models');
const { userRoles } = require('../../src/components/auth/authContants');

export function get2Digits(no) {
    if (no < 10) return `0${no}`;
    return no;
}

export function get4Digits(no) {
    if (no <= 0) return '0000';
    if (no < 10) return `000${no}`;
    if (no < 100) return `00${no}`;
    if (no < 1000) return `0${no}`;
    return no.toString().substr(no.toString().length - 5, 4);
}

export function formatDate(date) {
    if (date) {
        return moment(date)
            .format('YYYY-MM-DD');
    }
    return '';
}
export function addFilterByDate(filterValue) {
    let [start = '', end = ''] = filterValue;

    if (!start) start = '1900-01-01 00:00:00';
    else start = `${start} 00:00:00`;
    if (!end) end = '9999-12-31 23:59:59';
    else end = `${end} 23:59:59`;
    return {
        [Op.between]: [start, end],
    };
}

export async function checkObjectExist(id, model) {
    try {
        const object = await models[model].findByPk(id, {
            attributes: ['id'],
        });
        return !!object;
    } catch (e) {
        return false;
    }
}

export async function checkObjectExistAndGetValue(id, model, attributes) {
    try {
        const object = await models[model].findByPk(id, {
            attributes,
        });
        return object;
    } catch (e) {
        return false;
    }
}

export async function checkUniqueValue(model, query = {}) {
    try {
        const value = await models[model].findOne({
            where: query,
        });
        return !value;
    } catch (e) {
        console.log('checkUniqueValue error: ', e);
        return false;
    }
}

export function isAdmin(loginUser) {
    if (loginUser.role === userRoles.ADMIN || loginUser.role === userRoles.HQ_STAFF) return true;
    return false;
}

export const actionTypes = {
    UPDATE: 'update',
    CREATE: 'create',
    DELETE: 'delete',
};
