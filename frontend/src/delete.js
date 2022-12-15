const showSearchPost = (data) => {
  console.log(data);

  const filtered = posts.filter(
    (val) =>
      val.foodCategory.includes(data.foodCatgoryPick) &&
      val.dishType.includes(data.dishTypePick) &&
      val.restaurantId.includes(data.restaurantUserPick)
  );

  return setPosts(filtered);
};
