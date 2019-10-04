module.exports = (sequelize, Sequelize) => {
  const Cities = sequelize.define("city", {
    cities: {
      type: Sequelize.STRING
    }
  });

  return Cities;
};
