const router = require("express").Router();
const {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);

router.get("/", getRestaurant);

router.get("/restaurants", getAllRestaurants);

module.exports = router;
