import _ from 'lodash';
import { userRoles } from './userConstant';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const models = require('../../../database/models');

export async function checkUniqueValue(fileName, value, id = null) {
    const query = {
        [fileName]: value,
    };
    if (id) {
        query.id = {
            [Op.ne]: id,
        };
    }
    const user = await models.User.findOne({
        where: query,
    });
    return !user;
}

const userAttributes = ['id', 'username', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'password', 'departmentId', 'position', 'ext', 'extPassword'];
const userIncludes = [{
    model: models.Department,
    as: 'department',
    attributes: ['id', 'name']
}, {
    model: models.Role,
    as: 'role',
    attributes: ['id', 'name', 'description'],
}];

// get list of user
export async function fetchUserList(filter, loginUser) {
    const {
        page = 0, limit = 10, keyword = '', roleId = '', departmentId, position = '',
    } = filter;
    const userWhere = {};
    if (keyword) {
        userWhere[Op.or] = {
            username: {
                [Op.like]: `%${keyword}%`,
            },
            firstName: {
                [Op.like]: `%${keyword}%`,
            },
            lastName: {
                [Op.like]: `%${keyword}%`,
            },
            email: {
                [Op.like]: `%${keyword}%`,
            },
        };
    }

    if (roleId) userWhere.roleId = roleId;
    if (departmentId) userWhere.departmentId = departmentId;
    if (position) userWhere.position = position;
    const offset = parseInt(limit, 10) * parseInt(page, 10);
    const query = {
        attributes: userAttributes,
        offset,
        limit: parseInt(limit, 10),
        order: [['id', 'desc']],
        include: userIncludes,
        distinct: true,
        where: userWhere,
    };
    const users = await models.User.findAndCountAll(query);
    return users;
}

// create new user
export async function createUser(user) {
    const newUser = await models.User.create(user);
    return newUser;
}

// update one user
export async function updateUser(id, user) {
    const updatedUser = await models.User.update(user, {
        where: {
            id,
        },
    });
    return updatedUser;
}

// get user detail
export async function getUserDetail(id) {
    const user = await models.User.findByPk(id, {
        attributes: userAttributes,
        include: userIncludes,
    });
    return user;
}

// delete one user
export async function deleteUserById(id, loginUser) {
    await models.User.destroy({
        where: {
            id,
        },
    });
}
