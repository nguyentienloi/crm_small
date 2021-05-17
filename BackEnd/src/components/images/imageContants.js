const multer = require('multer');
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');
const moment = require('moment/moment');
const config = require('config');

export const UPLOAD_FOLDER = config.get('api.storage_folder') || 'public/';

export const storage = multer.diskStorage({
    destination(req, file, cb) {
        const subFolder = moment().format('YYYY-MM-DD');

        const fullPath = path.join(`${UPLOAD_FOLDER}upload/${subFolder}`);
        if (!fs.existsSync(fullPath)) {
            shell.mkdir('-p', fullPath);
        }
        cb(null, fullPath);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

