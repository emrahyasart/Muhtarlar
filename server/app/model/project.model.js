module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "project",
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
      },
      role: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return Project;
};
