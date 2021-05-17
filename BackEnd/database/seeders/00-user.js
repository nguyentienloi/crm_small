const bCrypt = require('bcrypt');
module.exports = {
    up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
       {
            username: 'admin',
            lastName: 'Nguyen',
            firstName: 'Van A',
            phone: '535352525',
            email: 'tt@gmail.com',
            password: bCrypt.hashSync('tt@1234', bCrypt.genSaltSync(8), null),
            roleId: 1,
            departmentId: 1,
            position: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 1,
            updatedBy: 1,
        }], {});
  },

  down: (queryInterface) =>
  queryInterface.bulkDelete('users', null, {})

  };
