// const Sequelize = require('sequelize');
// const _ = require('lodash');
// const moment = require('moment');

// const { Op } = Sequelize;

// const { CronJob } = require('cron');
// const config = require('config');
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// // const {
// //     customerTypes, groupStatus, importAccount, importResults, googleSchoolLevels, databaseSchoolLevels,
// // } = require('../middlewareConstant');
// // const {
// //     formatMobileToSave,
// // } = require('../../helpers/utils');
// // const { contactHistoryActions, contactStatus } = require('../../components/contacts/contactConstant');
// // const { getStatusWhenUpdate, getStatusWhenCreate, mergeContactSources } = require('./contactUtils');
// // const { createContactHistory } = require('../../components/contacts/contactService');

// const doc = new GoogleSpreadsheet(config.get('google.googleSpreadsheet'));
// const models = require('../../../database/models');
// // // log
// // const Log = require('../../../hac/util/log');
// // const log = new Log();

// // Hàm này được sử dụng chung cho phần import excel
// export async function processOneContact(row, createdBy = importAccount.BY_GOOGLE) {
//     const mobile = formatMobileToSave(row.mobile);
//     console.log('processOneContact: ', mobile);
//     // console.log('time: ', row.time);
//     const contactData = {};
//     if (row.time) {
//         try{
//             if(moment(row.time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === row.time){
//                 contactData.importedAt = row.time;
//                 contactData.importUpdatedAt = row.time;
//             }
//             else{
//                 contactData.importedAt = moment.utc(new Date(Math.round((+row.time - 25569) * 86400 * 1000))
//                     .toUTCString()).format('YYYY-MM-DD HH:mm:ss');
//                 contactData.importUpdatedAt = moment.utc(new Date(Math.round((+row.time - 25569) * 86400 * 1000))
//                     .toUTCString()).format('YYYY-MM-DD HH:mm:ss');
//             }
//         }
//         catch (e){
//             console.log('processOneContact ', e);
//             if(row.time){
//                 contactData.importedAt = row.time;
//                 contactData.importUpdatedAt = row.time;
//             }
//         }
        
//     } else {
//         contactData.importedAt = moment().format('YYYY-MM-DD HH:mm:ss');
//         contactData.importUpdatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
//     }
//     contactData.codeSource = row.codeSource;
//     contactData.linkUrl = row.url;
//     contactData.userMarketingName = row.marketingName;
//     contactData.description = '';
//     const existContactSource = await models.ContactSource.findOne({
//         attributes: ['id'],
//         where: {
//             name: row.contactSourceName,
//         },
//     });
//     // find any main customer which has same mobile
//     const existCustomer = await models.Customer.findOne({
//         where: {
//             mobile,
//             isMainCustomer: true,
//         },
//         include: [{
//             model: models.Contact,
//             as: 'contact',
//             attributes: ['id', 'statusId', 'userId'],
//             include: [{
//                 model: models.User,
//                 as: 'user',
//                 attributes: ['id', 'status'],
//             }, {
//                 model: models.ContactStatus,
//                 as: 'contactStatus',
//                 attributes: ['id', 'type'],
//             }],
//         }],
//     });
//     let newContact = {};
//     if (!existCustomer) { // Neu sdt chua ton tai thi tao moi
//         console.log('Số điện thoại chưa tồn tại, thực hiện tạo mới');
//         // create a new contact
//         contactData.statusId = getStatusWhenCreate(mobile);
//         log.info('processOneContact getStatusWhenCreate ' + mobile + ' ' + contactData.statusId);
//         contactData.createdBy = createdBy;
//         contactData.updatedBy = createdBy;
//         newContact = await models.Contact.create(contactData);
//         contactData.id = newContact.id;
//         // create main customers
//         await models.Customer.create({
//             contactId: newContact.id,
//             mobile,
//             isMainCustomer: true,
//             fullName: mobile,
//             position: customerTypes.OTHER,
//             createdBy,
//             updatedBy: createdBy,
//         });
//         // Create child customer
//         await models.Customer.create({
//             contactId: newContact.id,
//             isMainCustomer: false,
//             fullName: row.childName,
//             birthdayDescription: row.schoolLevel,
//             productDescription: row.productDescription,
//             position: customerTypes.CHILD,
//             createdBy,
//             updatedBy: createdBy,
//         });
//     } else { // neu da ton tai thi add con khac; trung ca sdt, trung ten con thi lay data moi nhat
//         console.log('Số điện thoại đã tồn tại, thực hiện cập nhật');
//         const status = await getStatusWhenUpdate(_.get(existCustomer, 'contact', {}), mobile);
//         const oldStatusId = _.get(existCustomer, 'contact.statusId', null);
//         log.info('processOneContact getStatusWhenUpdate ' + mobile + ' ' + JSON.stringify(status));
//         contactData.statusId = status.statusId;
//         contactData.userId = status.userId;
//         contactData.id = existCustomer.contactId;
//         contactData.updatedBy = createdBy;
//         if(oldStatusId && oldStatusId != status.statusId){
//             contactData.lastStatusId = oldStatusId;
//         }
//         if(status.statusId == contactStatus.NEW) {
//             contactData.beforeT1New = oldStatusId;
//         }
//         if((status.statusId == contactStatus.NEW || status.statusId == contactStatus.T0) && (oldStatusId != contactStatus.NEW && oldStatusId != contactStatus.T0)) {
//             contactData.beforeSupport = oldStatusId;
//         }
//         contactData.numberOfCall = 0;
//         await models.Contact.update(contactData, {
//             where: {
//                 id: existCustomer.contactId,
//             },
//         });
//         console.log('Update contact thành công');
//         // update child Customer
//         const existChildCustomer = await models.Customer.findOne({
//             where: {
//                 contactId: contactData.id,
//                 fullName: row.childName,
//                 isMainCustomer: false,
//                 position: customerTypes.CHILD,
//             },
//         });
//         if (!existChildCustomer) {
//             // Create child customer
//             await models.Customer.create({
//                 contactId: contactData.id,
//                 isMainCustomer: false,
//                 fullName: row.childName,
//                 birthdayDescription: row.schoolLevel,
//                 productDescription: row.productDescription,
//                 position: customerTypes.CHILD,
//                 createdBy,
//                 updatedBy: createdBy,
//             });
//             console.log('Thêm mới con thành công');
//         } else {
//             await models.Customer.update({
//                 contactId: contactData.id,
//                 isMainCustomer: false,
//                 fullName: row.childName,
//                 birthdayDescription: row.schoolLevel,
//                 productDescription: row.productDescription,
//                 position: customerTypes.CHILD,
//                 createdBy,
//                 updatedBy: createdBy,
//             }, {
//                 where: {
//                     id: existChildCustomer.id,
//                 },
//             });
//             console.log('Cập nhật con thành công');
//         }
//     }
//     // Contact Source
//     if (existContactSource) {
//         mergeContactSources(contactData.id, [existContactSource], createdBy);
//     }
//     // Kiểm tra productGroup
//     let foundGroup;

//     console.log('row.productGroup', row.productGroup);
//     if(!row.productGroup && row.productDescription && row.productDescription.trim().toLowerCase() == '["môn tiếng anh"]'){
//         row.productGroup = 'Tienganh';
//     }
//     if (row.productGroup) {
//         foundGroup = await models.ProductGroup.findOne({
//             where: {
//                 name: row.productGroup,
//                 status: groupStatus.ACTIVE,
//             },
//         });
//     }
//     // Xóa nhóm sản phẩm đã tồn tại
//     await models.ContactGroup.destroy({
//         where: {
//             contactId: contactData.id,
//         },
//     });
//     if (foundGroup) {
//         await models.ContactGroup.create({
//             contactId: contactData.id,
//             groupId: foundGroup.id,
//             createdBy,
//             updatedBy: createdBy,
//         });
//     } else if (row.url) {
//         console.log(`Không tìm thấy nhóm sản phẩm, tìm theo url=${row.url} va school level=${row.schoolLevel}`);
//         // Get group id from link url
//         const linkUrl = row.url.split('?')[0];
//         let schoolLevel = null;
//         if (row.schoolLevel === googleSchoolLevels.KINDERGARTEN) {
//             schoolLevel = databaseSchoolLevels.KINDERGARTEN;
//         } else if (row.schoolLevel === googleSchoolLevels.PRIMARY_SCHOOL) {
//             schoolLevel = databaseSchoolLevels.PRIMARY_SCHOOL;
//         } else if (row.schoolLevel === googleSchoolLevels.JUNIOR_HIGH_SCHOOL) {
//             schoolLevel = databaseSchoolLevels.JUNIOR_HIGH_SCHOOL;
//         }
//         console.log('schoolLevel', schoolLevel);
//         const where = {
//             url: {
//                 [Op.like]: `${linkUrl}%`,
//             },
//             '$productGroups.status$': groupStatus.ACTIVE,
//         };
//         if (schoolLevel) where['$productGroups.schoolLevel$'] = schoolLevel;
//         else {
//             where['$productGroups.schoolLevel$'] = {
//                 [Op.in]: [null, ''],
//             };
//         }
//         const productGroupUrls = await models.ProductGroupSource.findAll({
//             attributes: ['groupId', 'url'],
//             include: [{
//                 model: models.ProductGroup,
//                 as: 'productGroups',
//                 attributes: ['id'],
//                 required: true,
//                 order: [['createdAt', 'desc']],
//             }],
//             where,
//             order: [['createdAt', 'desc']],
//             distinct: true,
//             // limit: 1,
//         });
//         if (_.isArray(productGroupUrls) && productGroupUrls.length) {
//             let productGroupUrlsArray = [];
//             for(let productGroupUrlKey = 0; productGroupUrlKey < productGroupUrls.length; productGroupUrlKey++){
//                 if(productGroupUrls[productGroupUrlKey].url == linkUrl){
//                     productGroupUrlsArray.push(productGroupUrls[productGroupUrlKey]);
//                 }
//             }
//             if(!productGroupUrlsArray.length){
//                 productGroupUrlsArray = [productGroupUrls[0]];
//             }
//             console.log('Thêm mới nhóm sản phẩm', JSON.stringify(productGroupUrlsArray));
//             await models.ContactGroup.bulkCreate(productGroupUrlsArray.map(g => ({
//                 contactId: contactData.id,
//                 groupId: g.groupId,
//                 createdBy,
//                 updatedBy: createdBy,
//             })));
//         }
//     }
//     // Add contact history
//     // models.ContactHistory.create({
//     //     contactId: contactData.id,
//     //     action: ((existCustomer) ? contactHistoryActions.UPDATE : contactHistoryActions.CREATE),
//     //     description: ((existCustomer) ? 'Cập nhật' : 'Thêm mới').concat(' contact từ google spread'),
//     //     createdBy,
//     //     updatedBy: createdBy,
//     // });
//     let listChild = [];
//     if(row.childName){
//         listChild.push({fullName: row.childName});
//     }
//     let dataProductGroup = {};
//     if (row.productGroup) {
//         dataProductGroup.name = row.productGroup;
//     }
//     let listContactSource = [{name: row.contactSourceName}];
//     createContactHistory({
//         id: contactData.id,
//         type: ((existCustomer) ? contactHistoryActions.UPDATE : contactHistoryActions.CREATE),
//         createdBy,
//         updatedBy: createdBy,
//         children: listChild,
//         productGroup: dataProductGroup,
//         contactSources: listContactSource
//     });
//     return {
//         existCustomer,
//         contactData,
//     };
// }

// async function processOneRow(rowNumber, row, createdBy = importAccount.BY_GOOGLE) {
//     try {
//         if (!row.mobile) {
//             models.ContactImportGoogleResult.create({
//                 rowNumber,
//                 status: importResults.SUCCESS,
//                 description: 'Thiếu số điện thoại, không thể tạo contact',
//                 createdBy,
//                 updatedBy: createdBy,
//                 receive_data: row ? JSON.stringify(row) : ''
//             });
//             return;
//         }
//         const result = await processOneContact(row, createdBy);
//         const { existCustomer, contactData = {} } = result;

//         models.ContactImportGoogleResult.create({
//             contactId: contactData.id,
//             rowNumber,
//             status: importResults.SUCCESS,
//             description: ((existCustomer) ? 'Cập nhật' : 'Thêm mới').concat(' contact từ google spread thành công'),
//             createdBy,
//             updatedBy: createdBy,
//             receive_data: row ? JSON.stringify(row) : ''
//         });
//     } catch (e) {
//         console.log('processOneRow error: ', e);
//         const { errors = [] } = e;
//         const [error = {}] = errors;
//         models.ContactImportGoogleResult.create({
//             rowNumber,
//             status: importResults.FAILURE,
//             description: `${e.message}: ${_.get(error, 'message', '')}`,
//             createdBy,
//             updatedBy: createdBy,
//             receive_data: row ? JSON.stringify(row) : ''
//         });
//     }
// }

// let processing = false;
// async function readDataFromGoogleSheet() {
//     try {
//         console.log('start sync contact');
//         processing = true;
//         await doc.useServiceAccountAuth({
//             client_email: config.get('google.email'),
//             private_key: config.get('google.key'),
//         });
//         await doc.loadInfo(); // loads document properties and worksheets
//         const sheet = doc.sheetsById[config.get('google.sheetId')];
//         let nextRowNumber = 1; // lưu rowNumber của dòng cuối cùng của lần cuối đọc file

//         const limit = 2; // mỗi lần lấy limit bản ghi
//         let endOfFile = false;
//         while (!endOfFile) {
//             try {
//                 console.log('scan next 10 lines');
//                 /* eslint-disable no-await-in-loop */
//                 const contactImportResult = await models.ContactImportGoogleResult.findOne({
//                     attributes: ['id', 'rowNumber'],
//                     order: [['rowNumber', 'desc']],
//                 });
//                 if (contactImportResult) {
//                     nextRowNumber = (contactImportResult.rowNumber || 0) + 1;
//                 }
//                 // eslint-disable-next-line no-await-in-loop
//                 await sheet.loadCells(`A${nextRowNumber}:L${nextRowNumber + limit + 1}`);
//                 for (let i = nextRowNumber; i <= nextRowNumber + limit; i += 1) {
//                     const row = {
//                         time: (sheet.getCell(i, 0).value || '').toString().trim(),
//                         childName: (sheet.getCell(i, 1).value || '').toString().trim(),
//                         mobile: (sheet.getCell(i, 2).value || '').toString().trim(),
//                         schoolLevel: (sheet.getCell(i, 3).value || '').toString().trim(),
//                         productDescription: (sheet.getCell(i, 4).value || '').toString().trim(),
//                         url: (sheet.getCell(i, 5).value || '').toString().trim(),
//                         contactSourceName: (sheet.getCell(i, 6).value || '').toString().trim(),
//                         codeSource: (sheet.getCell(i, 7).value || '').toString().trim(),
//                         marketingName: (sheet.getCell(i, 8).value || '').toString().trim(),
//                         productGroup: (sheet.getCell(i, 9).value || '').toString().trim(),
//                     };
//                     // Trường hợp dòng ko có dữ liệu thì dừng quét
//                     if (!row.time
//                         && !row.childName
//                         && !row.mobile
//                         && !row.schoolLevel
//                         && !row.productDescription
//                         && !row.url
//                         && !row.contactSourceName
//                         && !row.codeSource
//                         && !row.marketingName
//                         && !row.productGroup) {
//                         endOfFile = true;
//                         console.log('end of file...');
//                     } else {
//                         // eslint-disable-next-line no-await-in-loop
//                         await processOneRow(i, row);
//                     }
//                 }
//             } catch (e) {
//                 console.log('Lỗi trong quá trình sync contact', e.message);
//                 endOfFile = true;
//             }
//         }

//         processing = false;
//         console.log('finish sync contact');
//     } catch (e) {
//         processing = false;
//         console.log('Lỗi trong quá trình sync contact', e.message);
//     }
// }
// const dayInMonthToReset = 29; // Ngày thực hiện reset data (sẽ quét lại từ line 1)
// let alreadyReset = false; // Ngày hôm đó đã reset chưa
// // async function resetImportGoogle() {
// //     try {
// //         const thisDay = moment().date();
// //         if (!alreadyReset && thisDay === dayInMonthToReset) {
// //             console.log('reset google data');
// //             // Thực hiện reset data
// //             await models.ContactImportGoogleResult.destroy({
// //                 where: {
// //                     rowNumber: {
// //                         [Op.gte]: 0,
// //                     },
// //                 },
// //             });
// //             alreadyReset = true;
// //         } else if (thisDay !== dayInMonthToReset) {
// //             alreadyReset = false;
// //         }
// //     } catch (e) {
// //         console.log('reset data error', e);
// //         alreadyReset = false;
// //     }
// // }

// export const syncGoogleJob = new CronJob('0 */2 * * * *', async () => {
//     if (!processing) {
//         readDataFromGoogleSheet();
//     } else {
//         console.log('Service is processing....');
//     }
// });
