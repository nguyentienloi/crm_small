import { respondArraySuccess, respondWithError } from '../../helpers/messageResponse';
import {
    fetchPermissionList, updateRolePermissions, fetchRolePermissions,
} from './roleService';

const {
    ERROR_CODE_SYSTEM_ERROR,
} = require('../../helpers/errorCodes');

export async function getPermissionList(req, res) {
    try {
        const data = await fetchPermissionList();
        res.json(respondArraySuccess(data));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function getRoleList(req, res) {
    try {
        const data = await fetchRolePermissions();
        res.json(respondArraySuccess(data));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}

export async function updateRole(req, res) {
    try {
        const roles = await updateRolePermissions(req.body);
        res.json(respondArraySuccess(roles));
    } catch (error) {
        res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
    }
}
