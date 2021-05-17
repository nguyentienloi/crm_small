const bCrypt = require('bcrypt');

export function isValidPassword(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}
export function hashPassword(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}
