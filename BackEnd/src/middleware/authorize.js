import { respondWithError } from '../helpers/messageResponse';

const i18n = require('i18n');
const {
    ERROR_CODE_FORBIDDEN,
} = require('../helpers/errorCodes');

export async function authorize(req, res, next) {
    try {
        const { permissions = [], apiRole = '' } = req;
        if (permissions.includes(apiRole)) {
            next();
        } else {
            res.json(respondWithError(ERROR_CODE_FORBIDDEN, 'Forbidden'));
            return;
        }
    } catch (e) {
        res.json(respondWithError(ERROR_CODE_FORBIDDEN, 'Forbidden'));
    }
}
