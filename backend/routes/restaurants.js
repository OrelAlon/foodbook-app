const router = require("express").Router();
const {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  createTempRestaurant,
  followRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);

router.post("/temprest", createTempRestaurant);

router.get("/", getRestaurant);

router.get("/restaurants", getAllRestaurants);

router.put("/:id", updateRestaurant);

router.put("/:id/followrestaurant", followRestaurant);

router.delete("/:id", deleteRestaurant);

module.exports = router;
