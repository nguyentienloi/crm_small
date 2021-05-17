import _ from 'lodash';
import { hashPassword, isValidPassword } from './authService';
import { respondWithError, respondItemSuccess } from '../../helpers/messageResponse';

const jwt = require('jsonwebtoken');

const models = require('../../../database/models');
const {
    ERROR_CODE_SYSTEM_ERROR,
    ERROR_CODE_CREDENTIAL_NOT_EXIST,
    ERROR_CODE_INCORRECT_PASSWORD,
    ERROR_CODE_EMAIL_EXIST,
    ERROR_CODE_OLD_PASSWORD_NOT_CORRECT,
} = require('../../helpers/errorCodes');

const {
    SECRET_ACCESS_TOKEN,
    SECRET_ACCESS_TOKEN_EXPIRE,
    SECRET_REFRESH_ACCESS_TOKEN,
    SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
    userRoles,
} = require('./authContants');
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
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await models.User.findOne({
            attributes: ['id', 'username', 'password', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'password', 'departmentId', 'position', 'ext', 'extPassword'],
            include: userIncludes,
            where: {
                username,
            },
        });
        if (!user) {
            // return user not exist
            res.json(respondWithError(ERROR_CODE_CREDENTIAL_NOT_EXIST, 'Tên đăng nhập hoặc mật khẩu không đúng', {}));
            return;
        }
        if (!isValidPassword(user.password, password)) {
            // return password not correct
            res.json(respondWithError(ERROR_CODE_INCORRECT_PASSWORD, 'Tên đăng nhập hoặc mật khẩu không đúng', {}));
            return;
        }
        // sign token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS_TOKEN, {
            expiresIn: SECRET_ACCESS_TOKEN_EXPIRE,
        });
        const rToken = jwt.sign({ id: user.id, email: user.email }, SECRET_REFRESH_ACCESS_TOKEN, {
            expiresIn: SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
        });
        const profile = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            ext: user.ext,
            extPassword: user.extPassword,
            position: user.position,
            role: user.role,
            department: user.department,
        };
        res.json(respondItemSuccess({
            accessToken: {
                token,
                expiresIn: SECRET_ACCESS_TOKEN_EXPIRE,
            },
            refreshToken: {
                token: rToken,
                expiresIn: SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
            },
            profile,
        }));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function register(req, res) {
    const {
        username, password, firstName, lastName, ext, extPassword, phone, email, roleId, departmentId, position
    } = req.body;
    try {
        const user = await models.User.findOne({
            where: {
                username,
            },
        });
        if (user) {
            // return user not exist
            res.json(respondWithError(ERROR_CODE_EMAIL_EXIST, 'Tên đăng nhập đã tồn tại'));
            return;
        }
        const newUser = await models.User.create({
            username,
            email,
            firstName,
            lastName,
            password: hashPassword(password),
            extPassword: extPassword ? hashPassword(extPassword) : '',
            phone,
            ext,
            roleId,
            departmentId,
            position
        });
        res.json(respondItemSuccess({
            profile: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
                ext: newUser.ext,
                extPassword: newUser.extPassword,
                position: newUser.position,
            },
        }));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function getProfile(req, res) {
    const { loginUser = {} } = req;
    const user = await models.User.findByPk(loginUser.id, {
        attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'password', 'departmentId', 'position', 'ext', 'extPassword'],
        include: userIncludes,
    });

    const profile = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        ext: user.ext,
        extPassword: user.extPassword,
        position: user.position,
        role: user.role,
        department: user.department,
    };
    res.json(respondItemSuccess({
        profile,
    }));
}

export async function updateProfile(req, res) {
    try {
        const { loginUser = {} } = req;
        const {
            firstName, lastName, ext, extPassword, phone, email, roleId, departmentId, position
        } = req.body;
        await models.User.update({
            firstName, lastName, ext,
            extPassword: hashPassword(extPassword),
            phone, email, roleId, departmentId, position
        }, {
            where: {
                id: loginUser.id,
            },
        });
        const newProfile = await models.User.findByPk(loginUser.id, {
            attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'password', 'departmentId', 'position', 'ext', 'extPassword'],
            include: userIncludes,
        });
        res.json(respondItemSuccess({
            profile: newProfile,
        }));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
export async function changePassword(req, res) {
    try {
        const { loginUser = {} } = req;
        const {
            oldPassword,
            newPassword,
        } = req.body;
        const currentUser = await models.User.findByPk(loginUser.id);
        if (!isValidPassword(currentUser.password, oldPassword)) {
            res.json(respondWithError(ERROR_CODE_OLD_PASSWORD_NOT_CORRECT, 'Mật khẩu cũ không đúng', {}));
            return;
        }
        await models.User.update({
            password: hashPassword(newPassword),
        }, {
            where: {
                id: loginUser.id,
            },
        });
        res.json(respondItemSuccess());
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
export async function refreshToken(req, res) {
    try {
        const { user = {} } = req;
        // sign token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS_TOKEN, {
            expiresIn: SECRET_ACCESS_TOKEN_EXPIRE,
        });
        const rToken = jwt.sign({ id: user.id, email: user.email }, SECRET_REFRESH_ACCESS_TOKEN, {
            expiresIn: SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
        });
        return res.json(respondItemSuccess({
            accessToken: {
                token,
                expiresIn: SECRET_ACCESS_TOKEN_EXPIRE,
            },
            refreshToken: {
                token: rToken,
                expiresIn: SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
            },
            profile: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                ext: user.ext,
                extPassword: user.extPassword,
                position: user.position,
            },
        }));
    } catch (error) {
        return res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
