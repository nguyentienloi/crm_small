const models = require('../../../database/models');

export async function insertImage(newImage) {
    const image = await models.Image.create(newImage);
    return image;
}
