"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trainee.hasMany(models.TraineeCourse, {
        foreignKey: "traineeId",
        as: "traineeId",
      });

      // Many-to-many with Trainee
      // Trainee.belongsToMany(models.Course, {
      //   through: models.TraineeCourse,
      //   foreignKey: "traineeId",
      //   as: "traineeId",
      // });
    }
  }
  Trainee.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      birthday: DataTypes.STRING,
      education: DataTypes.STRING,
      skill: DataTypes.STRING,
      english_cert: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trainee",
    }
  );
  return Trainee;
};
