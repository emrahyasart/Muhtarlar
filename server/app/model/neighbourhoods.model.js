module.exports = (sequelize, Sequelize) => {
  const Neighbourhood = sequelize.define(
    "neighbourhood",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      neighbourhoods: {
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
      },
      districtId: {
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

  return Neighbourhood;
};
