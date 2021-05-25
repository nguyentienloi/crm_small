const db = require("../models");
const contactStatus = db.contactStatus;
const contact = db.Contact;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    contactStatus.findAll()
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

exports.findAllCount = async (req, res) => {
    const data = {};
    const contact1 = await contact.count({ where: {statusId: 1} });
    data['moi'] = contact1;
    const contact2 = await contact.count({ where: {statusId: 2} });
    data['da_goi'] = contact2;
    const contact3 = await contact.count({ where: {statusId: 3} });
    data['da_huy'] = contact3;
    const contact4 = await contact.count({ where: {statusId: 4} });
    data['cho_goi_lai'] = contact4;
    const contact5 = await contact.count({ where: {statusId: 5} });
    data['da_tao_don'] = contact5;
    res.send(data);
};