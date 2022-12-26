const createTempRestaurant = async (req, res) => {
  try {
    await cloudinary.api.resources_by_tag(
      "default_image",
      function (error, result) {
        console.log(result.resources[0].public_id);
      }
    );
    const defaultImagePublicId = await result.resources[0].public_id;
    imageUrl =
      (await "https://res.cloudinary.com/your-cloud-name/image/upload/") +
      defaultImagePublicId;
    const newTempRestaurant = new Restaurant({
      restaurantname: req.body.restaurantname,
      city: req.body.city,
      profilePicture: imageUrl,
    });
    const savedTempRestaurant = await newTempRestaurant.save();
    res.status(200).json(savedTempRestaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};
