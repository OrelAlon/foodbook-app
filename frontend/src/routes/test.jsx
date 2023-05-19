const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const id = crypto.randomBytes(4).toString("hex");
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, email_verified, name, picture } = payload;
    if (email_verified) {
      let user = await User.findOne({ email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(id, 10);
        user = await User.create({
          username: name,
          password: hashedPassword,
          email,
        });
      }
      if (!user.profilePicture) {
        const result = await cloudinary.v2.uploader.upload(picture, {
          folder: "avatars",
          width: 200,
          crop: "scale",
        });
        user.profilePicture = result.secure_url;
        await user.save();
      }
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
