const {google} = require("googleapis");
const db = require("../models");
const Contact = db.Contact;
const Op = db.Sequelize.Op;

exports.asyncContact =  async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1idMjbp2YWZZ7gFdG8uFTtG_-J_-9TKx4a0MRaVSWGsk";
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //read row
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"AA!A2:K"
    });
    var datas = getRows.data.values;
    for(var i = 0; i < datas.length; i++){
        const item = datas[i];
        if(item.length > 0){
            const checkContact = await Contact.findOne({
                attributes: ['id'],
                where: {
                    contactPhone: {
                        [Op.like]: `${item[2].trim()}`,
                    }
                }
            });
            if(!checkContact && !checkContact.id){
                var addressContact = item[5] + ' ' + item[6] + ' ' + item[7] + ' ' + item[8];
                const add = Contact.create({
                    contactName: item[1],
                    contactPhone: item[2],
                    numberProduct: item[3],
                    address: addressContact,
                    statusId: 1,
                    note: item[4],
                    khoId: 1,
                    linkUrl: item[10],
                    createdAt: item[0],
                    createdBy: 1,
                    updatedAt: item[0],
                    updatedBy: 1,
                    deletedAt: null
                });
                if(add) {
                    console.log(`Đã tạo ${item[2]} trên hệ thống.`);
                } else {
                    console.log(`Lỗi. không tạo ${item[2]} được trên hệ thống.`);
                }
            } else {
                console.log(`${item[2]}  đã tồn tại trên hệ thống.`);
            }
        }
    }
};