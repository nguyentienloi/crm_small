module.exports = {
    up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
       {
            name: 'admin',
            description: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 1,
            updatedBy: 1,
        }], {});
  },

  down: (queryInterface) =>
  queryInterface.bulkDelete('roles', null, {})

  };
