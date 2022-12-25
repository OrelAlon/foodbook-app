if (user.image) {
  // Use the image chosen by the user
  imageUrl = user.image;
} else {
  // Use the default image
  imageUrl =
    "https://res.cloudinary.com/your-cloud-name/image/upload/" +
    defaultImagePublicId;
}
