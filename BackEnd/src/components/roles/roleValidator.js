import { respondWithError } from '../../helpers/messageResponse';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const { ERROR_CODE_INVALID_PARAMETER } = require('../../helpers/errorCodes');

const roleSchema = Joi.object().keys({
    roleId: Joi.number().integer().required(),
    permissions: Joi.array().items(Joi.number().integer()).required(),
});

export async function updateValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.array().items(
        roleSchema,
    );
    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
