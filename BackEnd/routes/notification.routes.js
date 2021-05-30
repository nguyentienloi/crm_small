module.exports = app => {
    const notification = require("../controllers/notification.controller");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", notification.findAll);
    // router.get("/:id", notification.findOne);
    router.get("/countNoti", notification.findAllCount);

    app.use('/api/notification', router);
  };