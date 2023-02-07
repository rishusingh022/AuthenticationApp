const db = require('../../database/models');
const encrptedPassword = async (password) => {
  const encrptedPasswordRes = await db.sequelize.query(
    `SELECT crypt('${password}', gen_salt('bf'))`,
    {
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return encrptedPasswordRes[0].crypt;
};
module.exports = {
  encrptedPassword
};

