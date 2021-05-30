const db = require("../models");
const Notification = db.Notification;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const result = {};
    Notification.findAll({
      order: [
        ['createdAt', 'ASC']
      ]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    if(id){
        const isRead = await Notification.update({
            reader: 1
          }, {
            where: { id: id }
          });
        if (isRead) {
            res.send({sucess:true, message:'Update success'});
        }
    };
  };

  exports.findAllCount = async (req, res) => {
    const data = await Notification.count({ where: {reader: 0} });
    res.send({count: data});
};