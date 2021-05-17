module.exports = {
    up: (queryInterface) => {
    const data = [{
        model: 'user',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'service',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'service_combo',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'service_group',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'order',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'contact',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'department',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'role',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'call_center',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'schedule',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    },{
        model: 'kpi',
        actions: ['read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all']
    }];
    const permissions = [];
    data.forEach(d => {
       d.actions.forEach(action => {
           const permission = {
               model: d.model,
               action: action,
               createdAt: new Date(),
               updatedAt: new Date(),
               createdBy: 1,
               updatedBy: 1,
           };
           permissions.push(permission);
       })
    });
    return queryInterface.bulkInsert('permissions', permissions, {});
  },

  down: (queryInterface) =>
  queryInterface.bulkDelete('permissions', null, {})

  };
