const router = require("express").Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updatePassword,
} = require("../controllers/usersController");

router.get("/", getUser);

router.get("/users", getAllUsers);

router.put("/:id", updateUser);

router.post("/updatepassword", updatePassword);

router.delete("/:id", deleteUser);

module.exports = router;
