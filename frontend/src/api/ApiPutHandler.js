import axios from "axios";

// edit rest
export const submitHandlerEditRestaurant = async (
  file,
  restaurantName,
  restaurantCity,
  restaurantInstagram,
  restaurant,
  setLoading
) => {
  try {
    setLoading(true);

    const data = new FormData();
    if (file) {
      data.set("profilePicture", file);
    }
    data.set("restaurantname", restaurantName);
    data.set("city", restaurantCity);
    data.set("instagram", restaurantInstagram);
    data.set("restaurantId", restaurant._id);

    await axios.put("/api/restaurants/" + restaurant._id, data);
  } catch (error) {
    console.log(error);
  }
};
export const submitHandlerEditUser = async (
  file,
  userName,
  userInstagram,
  userEmail,
  currentUser,
  setLoading,
  setErrorMsg
) => {
  try {
    setLoading(true);

    const data = new FormData();
    if (file) {
      data.set("profilePicture", file);
    }
    data.set("username", userName);
    data.set("instagram", userInstagram);
    data.set("email", userEmail);
    data.set("userId", currentUser._id);

    await axios.put("/api/users/" + currentUser._id, data);

    try {
      const existingUser = await axios.get(
        `/api/users/?userId=${currentUser._id}`
      );
      // save the updated user back to the local storage
      localStorage.setItem("user", JSON.stringify(existingUser.data));

      // window.location.reload(false);
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
