"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addConstraint("TraineeCourses", {
        fields: ["traineeId"],
        type: "foreign key",
        name: "custom_fkey_constraint_traineeId_2",
        references: {
          //Required field
          table: "Trainees",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("TraineeCourses", {
        fields: ["courseId"],
        type: "foreign key",
        name: "custom_fkey_constraint_courseId_2",
        references: {
          //Required field
          table: "Courses",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint(
        "TraineeCourses",
        "custom_fkey_constraint_traineeId_2"
      ),

      await queryInterface.removeConstraint(
        "TraineeCourses",
        "custom_fkey_constraint_courseId_2"
      ),
    ];
  },
};
