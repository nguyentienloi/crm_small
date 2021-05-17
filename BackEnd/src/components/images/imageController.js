import _ from 'lodash';
import { respondItemSuccess, respondWithError } from '../../helpers/messageResponse';
import {
    insertImage,
} from './imageService';

const moment = require('moment/moment');
const path = require('path');
const multer = require('multer');
const { storage } = require('./imageContants');
const {
    ERROR_CODE_SYSTEM_ERROR,
    ERROR_CODE_UPLOAD_ERROR,
    ERROR_CODE_INVALID_PARAMETER,
} = require('../../helpers/errorCodes');

const fileController = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const { mimetype } = file;
        if (!mimetype.startsWith('image')) {
            return callback(new Error('Only image are allowed'));
        }
        return callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024,
    },
}).single('file');

export function uploadImage(req, res) {
    fileController(req, res, async (err) => {
        if (err) {
            res.send(respondWithError(ERROR_CODE_UPLOAD_ERROR, 'Upload file error!', err.message));
            return;
        }
        if (!req.file) {
            res.send(respondWithError(ERROR_CODE_INVALID_PARAMETER, 'File is required!'));
            return;
        }
        const subFolder = moment().format('YYYY-MM-DD');
        const file = {
            originalName: _.get(req, 'file.originalname', ''),
            fileName: _.get(req, 'file.filename', ''),
            mimetype: _.get(req, 'file.mimetype', ''),
            extension: path.extname(_.get(req, 'file.filename', '')),
            path: `upload/${subFolder}/${_.get(req, 'file.filename', '')}`,
        };
        try {
            const result = await insertImage(file);
            res.json(respondItemSuccess(result));
        } catch (error) {
            res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error));
        }
    });
}
