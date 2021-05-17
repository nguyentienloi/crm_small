import { authenticate } from '../../middleware/auth';
import {
    getList, create, update, deleteUser, getDetail,
} from './userController';
import { createValidator, updateValidator } from './userValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate, getList);
    router.post('/', authenticate, createValidator, create);
    router.get('/:id', authenticate, getDetail);
    router.patch('/:id', authenticate, updateValidator, update);
    router.delete('/:id', authenticate, deleteUser);
    app.use('/api/user', router);
};
