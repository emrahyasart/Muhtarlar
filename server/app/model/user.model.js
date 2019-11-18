module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      phoneNo: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpires: {
        type: Sequelize.DATE
      },

      adress: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      neighbourhoodId: {
        type: Sequelize.INTEGER
      },
      neighbourhoodName: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return User;
};
