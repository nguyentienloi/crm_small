import { authenticate } from '../../middleware/auth';
import {
    getPermissionList, updateRole, getRoleList,
} from './roleController';
import { updateValidator } from './roleValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/permissions', authenticate, getPermissionList);
    router.get('/', authenticate, getRoleList);
    router.post('/', authenticate, updateValidator, updateRole);
    app.use('/api/role', router);
};
