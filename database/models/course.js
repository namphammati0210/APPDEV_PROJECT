"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-many CourseCategory
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "courseCategoryId",
        onDelete: "CASCADE",
      });

      Course.hasMany(models.TraineeCourse, {
        foreignKey: "courseId",
        as: "courseId", // alias
      });

      // Many-to-many with Trainee
      // Course.belongsToMany(models.Trainee, {
      //   through: models.TraineeCourse,
      //   foreignKey: "courseId",
      //   as: "courseId",
      // });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      courseCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
