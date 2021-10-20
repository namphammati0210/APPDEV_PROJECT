var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const Trainer = database.db.Trainer;
const TrainingStaff = database.db.TrainingStaff;

//=========================== TRAINER ===========================================
/* GET index page. */
router.get("/", async function (req, res) {
  // SELECT * FROM Trainer
  try {
    const trainers = await Trainer.findAll();
    const trainingStaffs = await TrainingStaff.findAll();

    res.render("layouts/master", {
      content: "../admin/index",
      trainers: trainers,
      trainingStaffs: trainingStaffs,
      successFlashMessage: req.flash("successFlashMessage"),
      errorFlashMessage: req.flash("errorFlashMessage"),
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET create page. */
router.get("/create_trainer", function (req, res, next) {
  res.render("layouts/master", {
    content: "../trainer_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add trainer. */
router.post("/add_trainer", async function (req, res) {
  const { username, password } = req.body;

  try {
    const trainer = await Trainer.create({
      username: username,
      password: password,
    });

    if (trainer) {
      req.flash(
        "successFlashMessage",
        `Create trainer ${trainer.username} successfully !!!`
      );
    }

    res.redirect("/admin");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

/* GET create trainer. */
router.get("/delete_trainer/:trainerId", async function (req, res) {
  const { trainerId } = req.params;
  try {
    const deletedTrainer = await Trainer.destroy({
      where: {
        id: trainerId,
      },
    });

    if (deletedTrainer) {
      req.flash("successFlashMessage", `Delete trainer successully !!!`);
      res.redirect("/admin");
    }

    req.flash("errorFlashMessage", `Delete trainer failed !!!`);
    res.redirect("/admin");
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 45 ~ error", error);
  }
});

/* GET update page. */
router.get("/update_trainer/:trainerId", async function (req, res, next) {
  const { trainerId } = req.params;
  try {
    const trainer = await Trainer.findOne({
      where: {
        id: trainerId,
      },
    });

    const { id, username, password } = trainer.dataValues;
    res.render("layouts/master", {
      content: "../trainer_view/update",
      id,
      username,
      password,
      successFlashMessage: req.flash("successFlashMessage"),
      errorFlashMessage: req.flash("errorFlashMessage"),
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit_trainer", async function (req, res) {
  const { id, username, password } = req.body;
  try {
    const updatedTrainer = await Trainer.update(
      { username: username, password: password },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedTrainer) {
      req.flash("successFlashMessage", `Update trainer successully !!!`);
      res.redirect("/admin");
    }

    req.flash("errorFlashMessage", `Update trainer failed !!!`);
    res.redirect("/admin");
  } catch (error) {
    req.flash("errorFlashMessage", error);
  }
});

//===================== TRAINING STAFF ===================================

/* GET create page. */
router.get("/create_trainingStaff", function (req, res, next) {
  res.render("layouts/master", {
    content: "../trainingStaff_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add TrainingStaff. */
router.post("/add_trainingStaff", async function (req, res) {
  const { username, password, name } = req.body;

  try {
    const trainingStaff = await TrainingStaff.create({
      username: username,
      password: password,
      name: name,
    });

    if (trainingStaff) {
      req.flash(
        "successFlashMessage",
        `Create training staff ${trainingStaff.name} successfully !!!`
      );
    }

    res.redirect("/admin");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

module.exports = router;
