const authApiRouter = require('../components/auth');
const userApiRouter = require('../components/users');
const roleRouter = require('../components/roles');
const imageRouter = require('../components/images');

const routerManager = (app) => {
    authApiRouter(app);
    userApiRouter(app);
    roleRouter(app);
    imageRouter(app);
};

module.exports = routerManager;
