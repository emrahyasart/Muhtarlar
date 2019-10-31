module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define(
    "resume",
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
      },
      userId: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  return Resume;
};
