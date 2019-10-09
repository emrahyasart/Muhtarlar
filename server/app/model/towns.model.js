module.exports = (sequelize, Sequelize) => {
  const Town = sequelize.define(
    "town",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      cityId: {
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

  return Town;
};
