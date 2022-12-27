const router = require("express").Router();
const authRoutes = require("./auth");
const restaurantsRoutes = require("./restaurants");
const postsRoutes = require("./posts");
const userRoutes = require("./posts");

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantsRoutes);
router.use("/posts", postsRoutes);
router.use("/users", userRoutes);

module.exports = router;
