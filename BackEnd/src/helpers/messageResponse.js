const { ERROR_CODE_SUCCESS } = require('./errorCodes');

export function respondItemSuccess(data, message = 'Success') {
    return {
        code: ERROR_CODE_SUCCESS,
        message,
        data,
    };
}

export function respondArraySuccess(data, totalItem, message = 'Success') {
    return {
        code: ERROR_CODE_SUCCESS,
        message,
        data,
        totalItem,
    };
}

export function respondWithError(errorCode, message = 'Error', data = {}) {
    return {
        code: errorCode,
        message,
        errors: data,
    };
}
