module.exports = (sequelize, Sequelize) => {
  const District = sequelize.define(
    "district",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      townId: {
        type: Sequelize.INTEGER
      },
      districts: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return District;
};
