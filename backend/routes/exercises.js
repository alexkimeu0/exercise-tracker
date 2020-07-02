const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Return all Exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Return a single Exercise
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  Exercise.findById(id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add new Exercise
router.route("/add").post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Update exercise
router.route("/update/:id").post((req, res) => {
  const { id } = req.params;
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  Exercise.findById(id)
    .then((exercise) => {
      (exercise.username = username),
        (exercise.description = description),
        (exercise.duration = duration),
        (exercise.date = date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete Exercise
router.route("/:id").delete((req, res) => {
  const { id } = req.params;
  Exercise.findByIdAndDelete(id)
    .then(() => res.json("Exercise Deleted!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
