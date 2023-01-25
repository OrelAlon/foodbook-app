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
