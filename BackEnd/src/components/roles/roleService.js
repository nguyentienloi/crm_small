import _ from 'lodash';

const models = require('../../../database/models');

const permissionAttributes = ['id', 'model', 'action'];

// get list of permission
export async function fetchPermissionList() {
    const data = await models.Permission.findAll({
        attributes: permissionAttributes,
    });
    const modelGroups = _.groupBy(data, 'model');
    const permissions = Object.keys(modelGroups).map(key => ({
        model: key,
        actions: modelGroups[key].map(action => ({ id: action.id, action: action.action })),
    }));
    return permissions;
}

// get list of permission
export async function fetchRolePermissions() {
    const data = await models.Role.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: models.Permission,
            as: 'permissions',
            attributes: ['id', 'action', 'model'],

        }]
    });
    const roles = data.map(role => ({
        role: role.name,
        permissions: _.get(role, 'permissions', []).map(p => p.id),
    }));
    return roles;
}

// update role_permissions table
export async function updateRolePermissions(rolePermissions) {
    // delete old data
    await models.RolePermission.destroy({
        where: {},
        truncate: true,
        force: true,
    });
    const insertPermissions = [];
    rolePermissions.forEach((role) => {
        const { permissions = [] } = role;
        permissions.forEach((permission) => {
            insertPermissions.push({
                roleId: role.roleId,
                permissionId: permission,
            });
        });
    });
    await models.RolePermission.bulkCreate(insertPermissions);
    const roles = await fetchRolePermissions();
    return roles;
}
