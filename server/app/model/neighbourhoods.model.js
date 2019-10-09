module.exports = (sequelize, Sequelize) => {
  const Neighbourhood = sequelize.define(
    "neighbourhood",
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
      districtId: {
        type: Sequelize.INTEGER
      },
      neighbourhoods: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return Neighbourhood;
};
