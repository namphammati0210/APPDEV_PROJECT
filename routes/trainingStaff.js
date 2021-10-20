var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const Trainee = database.db.Trainee;
const CourseCategory = database.db.CourseCategory;
const Course = database.db.Course;
const Topic = database.db.Topic;
const TraineeCourse = database.db.TraineeCourse;

/* GET home page. */
router.get("/", async function (req, res) {
  const trainees = await Trainee.findAll();
  const courseCategories = await CourseCategory.findAll();
  // Eager Loading -- fetch all associated data
  const courses = await Course.findAll({
    include: CourseCategory,
  });
  const topics = await Topic.findAll();

  const traineeCourses = await TraineeCourse.findAll({
    attributes: { exclude: ["id"] },
    include: [Trainee, Course],
  });

  res.render("layouts/master", {
    content: "../trainingStaff_view/index",
    trainees: trainees,
    courseCategories: courseCategories,
    courses: courses,
    topics: topics,
    traineeCourses: traineeCourses,
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* GET create trainee page. */
router.get("/create_trainee", function (req, res) {
  res.render("layouts/master", {
    content: "../trainee_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add trainer. */
router.post("/add_trainee", async function (req, res) {
  const { username, password } = req.body;

  try {
    const trainee = await Trainee.create({
      username: username,
      password: password,
    });

    if (trainee) {
      req.flash(
        "successFlashMessage",
        `Create trainer ${trainee.username} successfully !!!`
      );
    }

    res.redirect("/staff");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

/* GET create course category page. */
router.get("/create_courseCategory", function (req, res) {
  res.render("layouts/master", {
    content: "../courseCategory_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add course category. */
router.post("/add_courseCategory", async function (req, res) {
  const { name, description } = req.body;

  try {
    const courseCategory = await CourseCategory.create({
      name: name,
      description: description,
    });

    if (courseCategory) {
      req.flash(
        "successFlashMessage",
        `Create course category ${courseCategory.name} successfully !!!`
      );
    }

    res.redirect("/staff");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

// ===================== Course =====================

/* GET create course page. */
router.get("/create_course", async function (req, res) {
  const courseCategories = await CourseCategory.findAll();

  res.render("layouts/master", {
    content: "../course_view/create",
    courseCategories: courseCategories,
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add course. */
router.post("/add_course", async function (req, res) {
  const { name, description, courseCategoryId } = req.body;

  try {
    const course = await Course.create({
      name: name,
      description: description,
      courseCategoryId: courseCategoryId,
    });

    if (course) {
      req.flash(
        "successFlashMessage",
        `Create course ${course.name} successfully !!!`
      );
    }

    res.redirect("/staff");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

// ==================== Topic ======================
/* GET create topic page. */
router.get("/create_topic", async function (req, res) {
  res.render("layouts/master", {
    content: "../topic_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add topic. */
router.post("/add_topic", async function (req, res) {
  const { name, description } = req.body;

  try {
    const topic = await Topic.create({
      name: name,
      description: description,
    });

    if (topic) {
      req.flash(
        "successFlashMessage",
        `Create topic ${topic.name} successfully !!!`
      );
    }

    res.redirect("/staff");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

// ==================== Assign trainee into course ==================== //
router.get("/create_traineeCourse", async function (req, res) {
  const courses = await Course.findAll();
  const trainees = await Trainee.findAll();

  res.render("layouts/master", {
    content: "../traineeCourse_view/create",
    courses: courses,
    trainees: trainees,
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

router.post("/add_traineeCourse", async function (req, res) {
  const { traineeId, courseId } = req.body;

  try {
    const traineeCourse = await TraineeCourse.create({
      traineeId: traineeId,
      courseId: courseId,
    });

    if (traineeCourse) {
      req.flash(
        "successFlashMessage",
        `Assign trainee into course successfully !!!`
      );
    }

    res.redirect("/staff");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

module.exports = router;
