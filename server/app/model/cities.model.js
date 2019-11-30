module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define(
    "city",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      cities: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.INTEGER
      },
      lon: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  return City;
};
