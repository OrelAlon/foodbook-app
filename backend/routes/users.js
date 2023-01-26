const router = require("express").Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updatePassword,
  starUser,
} = require("../controllers/usersController");

router.get("/", getUser);

router.get("/users", getAllUsers);

router.put("/:id", updateUser);

router.put("/:id/star", starUser);

router.post("/updatepassword", updatePassword);

router.delete("/:id", deleteUser);

module.exports = router;
