"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TraineeCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TraineeCourse.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      TraineeCourse.belongsTo(models.Trainee, {
        foreignKey: "traineeId",
        onDelete: "CASCADE",
      });
    }
  }
  TraineeCourse.init(
    {
      traineeId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TraineeCourse",
    }
  );
  TraineeCourse.removeAttribute("id");
  return TraineeCourse;
};
