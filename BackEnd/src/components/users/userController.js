import _ from 'lodash';
import { hashPassword } from '../auth/authService';
import { respondItemSuccess, respondArraySuccess, respondWithError } from '../../helpers/messageResponse';
import {
    fetchUserList, createUser, deleteUserById, updateUser, getUserDetail,
} from './userService';

const {
    ERROR_CODE_SYSTEM_ERROR,
    ERROR_CODE_ITEM_NOT_EXIST,
} = require('../../helpers/errorCodes');

export async function getList(req, res) {
    try {
        const rawData = await fetchUserList(req.query, req.loginUser);
        res.json(respondArraySuccess(rawData.rows, rawData.count));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function create(req, res) {
    try {
        const user = {
            username: _.get(req, 'body.username', ''),
            firstName: _.get(req, 'body.firstName', ''),
            lastName: _.get(req, 'body.lastName', ''),
            phone: _.get(req, 'body.phone', ''),
            ext: _.get(req, 'body.ext', ''),
            extPassword: _.get(req, 'body.extPassword', ''),
            email: _.get(req, 'body.email', ''),
            position: _.get(req, 'body.position', ''),
            roleId: _.get(req, 'body.roleId', null),
            avatarId: _.get(req, 'body.avatarId', null),
            departmentId: _.get(req, 'body.departmentId', null),
            password: hashPassword(_.get(req, 'body.password', '')),
            createdBy: _.get(req, 'loginUser.id', null),
            updatedBy: _.get(req, 'loginUser.id', null),
        };
        const newUser = await createUser(user);
        res.json(respondItemSuccess(newUser));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
export async function getDetail(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserDetail(id);
        res.json(respondItemSuccess(user));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
export async function update(req, res) {
    try {
        const { id } = req.params;
        const user = {
            firstName: _.get(req, 'body.firstName', ''),
            lastName: _.get(req, 'body.lastName', ''),
            phone: _.get(req, 'body.phone', ''),
            ext: _.get(req, 'body.ext', ''),
            extPassword: _.get(req, 'body.extPassword', ''),
            email: _.get(req, 'body.email', ''),
            position: _.get(req, 'body.position', ''),
            roleId: _.get(req, 'body.roleId', null),
            avatarId: _.get(req, 'body.avatarId', null),
            departmentId: _.get(req, 'body.departmentId', null),
            updatedBy: _.get(req, 'loginUser.id', null),
        };
        const foundUser = await getUserDetail(id);
        if (foundUser) {
            await updateUser(id, user);
            res.json(respondItemSuccess({ id }));
        } else {
            res.json(respondWithError(ERROR_CODE_ITEM_NOT_EXIST, 'Item does not exist'));
        }
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserDetail(id);
        if (user) {
            await deleteUserById(id, req.loginUser);
            res.json(respondItemSuccess());
        } else {
            res.json(respondWithError(ERROR_CODE_ITEM_NOT_EXIST, 'Item does not exist'));
        }
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
