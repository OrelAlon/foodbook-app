const router = require("express").Router();
const {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  createTempRestaurant,
  followRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);

router.post("/temprest", createTempRestaurant);

router.get("/", getRestaurant);

router.get("/restaurants", getAllRestaurants);

router.put("/:id", updateRestaurant);

router.put("/:id/followrestaurant", followRestaurant);

module.exports = router;
