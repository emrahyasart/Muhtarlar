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
      }
    },
    {
      timestamps: false
    }
  );

  return City;
};
