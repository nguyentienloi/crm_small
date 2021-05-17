import { authenticate } from '../../middleware/auth';
import {
    uploadImage,
} from './imageController';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.post('/', authenticate, uploadImage);
    app.use('/api/image', router);
};
