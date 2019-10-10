module.exports = (sequelize, Sequelize) => {
  const District = sequelize.define(
    "district",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      districts: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      cities: {
        type: Sequelize.STRING
      },
      townId: {
        type: Sequelize.INTEGER
      },
      towns: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return District;
};
