var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const Trainer = database.db.Trainer;

/* GET home page. */
router.get("/create_trainer", function (req, res, next) {
  res.render("trainer_view/create");
});

router.post("/add_trainer", async function (req, res) {
  const { username, password } = req.body;

  try {
    await Trainer.create({ username: username, password: password });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});
// JAVA PHP C#...
// Read Trainer
router.get("/", async function (req, res) {
  // SELECT * FROM Trainer
  try {
    const trainers = await Trainer.findAll();
    res.render("admin/index", { trainers: trainers });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
