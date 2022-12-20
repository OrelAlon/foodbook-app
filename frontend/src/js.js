app.post("/update-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    // Find the user in the database
    const user = await User.findOne({ _id: req.user._id });
    // Compare the current password to the password in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Current password is incorrect" });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update the user's password in the database
    await User.updateOne({ _id: req.user._id }, { password: hashedPassword });
    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error updating password" });
  }
});

//

app.post("/update-password", async (req, res) => {
  try {
    const { newPassword } = req.body;
    // Find the user in the database
    const user = await User.findOne({ _id: req.user._id });
    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update the user's password in the database
    await User.updateOne({ _id: req.user._id }, { password: hashedPassword });
    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error updating password" });
  }
});
