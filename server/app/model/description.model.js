module.exports = (sequelize, Sequelize) => {
  const Description = sequelize.define(
    "description",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      body: {
        type: Sequelize.STRING
      },

      neighbourhoodId: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  return Description;
};
