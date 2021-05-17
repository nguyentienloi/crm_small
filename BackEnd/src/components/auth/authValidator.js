import { respondWithError } from '../../helpers/messageResponse';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const { ERROR_CODE_INVALID_PARAMETER } = require('../../helpers/errorCodes');

export function loginValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function registerValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        username: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        firstName: Joi.string().max(20).required(),
        password: Joi.string().required(),
        email: Joi.string().email().allow(null),
        phone: Joi.string().max(13).min(9).allow(null).allow(''),
        ext: Joi.string().max(5).min(1).allow(null).allow(''),
        extPassword: Joi.string().max(13).min(9).allow(null).allow(''),
        avatarId: Joi.number().integer().allow(null),
        roleId: Joi.number().integer().required(),
        departmentId: Joi.number().integer().required(),
        position: Joi.string().valid(['sale_leader', 'telesales', 'sale_manager', 'sale_admin', 'admin']).required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function profileValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        lastName: Joi.string().max(20).required(),
        firstName: Joi.string().max(20).required(),
        email: Joi.string().email().allow(null),
        phone: Joi.string().max(13).min(9).allow(null).allow(''),
        ext: Joi.string().max(5).min(1).allow(null).allow(''),
        extPassword: Joi.string().max(13).min(9).allow(null).allow(''),
        avatarId: Joi.number().integer().allow(null),
        roleId: Joi.number().integer().required(),
        departmentId: Joi.number().integer().required(),
        position: Joi.string().valid(['sale_leader', 'telesales', 'sale_manager', 'sale_admin', 'admin']).required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function passwordValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().max(20).required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
