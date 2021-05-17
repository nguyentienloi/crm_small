module.exports = {
    up: (queryInterface) => {
    return queryInterface.bulkInsert('departments', [
       {
            name: 'Sale Department',
            description: 'Sale Department',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 1,
            updatedBy: 1,
        }], {});
  },

  down: (queryInterface) =>
  queryInterface.bulkDelete('departments', null, {})

  };
