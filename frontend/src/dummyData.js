const deleteUser = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User and their posts have been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};
