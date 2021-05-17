import _ from 'lodash';
import { respondWithError } from '../helpers/messageResponse';

const jwt = require('jsonwebtoken');
const models = require('../../database/models');
const {
    ERROR_CODE_TOKEN_EXPIRED,
    ERROR_CODE_UNAUTHORIZED,
} = require('../helpers/errorCodes');
const {
    SECRET_ACCESS_TOKEN,
    SECRET_REFRESH_ACCESS_TOKEN,
} = require('../components/auth/authContants');

function extractToken(authorization = '') {
    const bearerHeader = authorization.split(' ');
    if (bearerHeader.length === 2 && bearerHeader[0] === 'Bearer') {
        return bearerHeader[1];
    }
    return '';
}
const userIncludes = [{
    model: models.Department,
    as: 'department',
    attributes: ['id', 'name']
}, {
    model: models.Role,
    as: 'role',
    attributes: ['id', 'name', 'description'],
    include: [{
        model: models.Permission,
        as: 'permissions',
        attributes: ['id', 'model', 'action'],
    }]
}];
export async function authenticate(req, res, next) {
    try {
        const token = extractToken(req.headers.authorization || '');
        const decodedToken = req.authorization_type === 'refresh' ? jwt.verify(token, SECRET_REFRESH_ACCESS_TOKEN)
            : jwt.verify(token, SECRET_ACCESS_TOKEN);
        const { id } = decodedToken;
        const user = await models.User.findByPk(id, {
            include: userIncludes,
            attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'password', 'departmentId', 'position', 'ext', 'extPassword'],
        });
        if (user) {
            req.loginUser = user;
            req.permissions = _.get(user, 'role.permissions', []).map(p => (`${_.get(p, 'permission.model')}_${_.get(p, 'permission.action')}`));
            next();
        } else {
            res.json(respondWithError(ERROR_CODE_TOKEN_EXPIRED, 'Token Expired'));
            return;
        }
    } catch (e) {
        console.log('error in authenticate: ', e);
        if (_.get(e, 'name', '') === 'TokenExpiredError') {
            res.json(respondWithError(ERROR_CODE_TOKEN_EXPIRED, 'Token Expired'));
            return;
        }
        res.json(respondWithError(ERROR_CODE_UNAUTHORIZED, 'Unauthorized'));
    }
}
