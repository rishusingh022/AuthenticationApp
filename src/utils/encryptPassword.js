const crypto = require('crypto');

const encryptPassword = async (password) => {
  let hashPassword = crypto.createHash('sha256').update(password).digest('hex');
  return hashPassword;
};
module.exports = {
  encryptPassword,
};
