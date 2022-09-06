const router = require("express").Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getUser);

router.get("/users", getAllUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
