module.exports = (sequelize, Sequelize) => {
  const Town = sequelize.define(
    "town",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      towns: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      cities: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return Town;
};
