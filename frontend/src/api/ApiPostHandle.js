import axios from "axios";

// add rest
export const submitHandlerAddRestaurant = async (
  restaurantName,
  city,
  price,
  instagramLink,
  selectFoodCatgory,
  file,
  setErrorMsg,
  setLoading
) => {
  e.preventDefault();
  if (file == null) {
    return setErrorMsg("Please upload an image");
  }
  if (restaurantName == null) {
    return setErrorMsg("Please choose a restaurant");
  }
  if (city == null) {
    return setErrorMsg("Please choose a city");
  }
  try {
    setErrorMsg("");
    setLoading(true);
    const data = new FormData();
    data.set("profilePicture", file);
    data.set("restaurantname", restaurantName);
    data.set("city", city);
    data.set("price", price);
    data.set("instgram", instagramLink);
    data.set("foodCategory", JSON.stringify(selectFoodCatgory));

    await axios.post("/api/restaurants/", data);
    window.location.reload();
  } catch (error) {
    console.log(error.response);
  }
};

// change user password
export const changeUserPassword = async (newPassword, userId) => {
  const res = await axios.post("/api/users/updatepassword", {
    newPassword,
    userId,
  });
  return res;
};
